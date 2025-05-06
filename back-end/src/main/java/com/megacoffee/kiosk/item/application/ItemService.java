package com.megacoffee.kiosk.item.application;

import com.megacoffee.kiosk.detail.domain.Detail;
import com.megacoffee.kiosk.detail.application.DetailService;
import com.megacoffee.kiosk.item.domain.Item;
import com.megacoffee.kiosk.item.dto.*;
import com.megacoffee.kiosk.itempicture.domain.ItemPicture;
import com.megacoffee.kiosk.itempicture.application.ItemPictureRepository;
import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import com.megacoffee.kiosk.optioncategories.application.OptionCategoriesService;
import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import com.megacoffee.kiosk.itemoption.application.ItemOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.megacoffee.kiosk.global.service.S3Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final ItemPictureRepository itemPictureRepository;
    private final DetailService detailService;
    private final OptionCategoriesService optionCategoriesService;
    private final ItemOptionService itemOptionService;
    private final S3Service s3Service;

    @Transactional
    public ItemDetailDTO createMenu(MenuCreateRequest request) {
        // 1. Detail 생성
        Detail detail = new Detail();
        detail.setDetailKcal(request.getDetailKcal());
        detail.setDetailNa(request.getDetailNa());
        detail.setDetailGain(request.getDetailGain());
        detail.setDetailSugar(request.getDetailSugar());
        detail.setDetailSatfat(request.getDetailSatfat());
        detail.setDetailTransfat(request.getDetailTransfat());
        detail.setDetailProtein(request.getDetailProtein());
        detail.setDetailCaffeine(request.getDetailCaffeine());
        detail = detailService.save(detail);

        // 2. Item 생성
        Item item = new Item();
        item.setItemName(request.getItemName());
        item.setItemCategory(request.getItemCategory());
        item.setItemSubCategory(request.getItemSubCategory());
        item.setItemMenuDetail(request.getItemMenuDetail());
        item.setItemPrice(request.getItemPrice());
        item.setItemSoldout(request.isItemSoldout());
        item.setDetailId(detail);
        item.setItemMakeTime(request.getItemMakeTime());

        // Item 저장
        item = itemRepository.save(item);

        // 3. 이미지가 있는 경우 S3에 업로드하고 ItemPicture 저장
        if (request.getItemImage() != null && !request.getItemImage().isEmpty()) {
            try {
                String imageUrl = s3Service.uploadFile(request.getItemImage());
                ItemPicture itemPicture = new ItemPicture();
                itemPicture.setItemPictureUrl(imageUrl);
                itemPicture.setItem(item);
                itemPictureRepository.save(itemPicture);
            } catch (IOException e) {
                throw new RuntimeException("이미지 업로드 중 오류가 발생했습니다.", e);
            }
        }

        // 4. OptionCategories와 ItemOption 생성
        List<OptionCategories> optionCategories = new ArrayList<>();
        for (OptionCategoryRequest categoryRequest : request.getOptionCategories()) {
            // OptionCategories 생성
            OptionCategories optionCategory = new OptionCategories();
            optionCategory.setCategoryName(categoryRequest.getCategoryName());
            optionCategory.setCategoryDescription(categoryRequest.getCategoryDescription());
            optionCategory.setCategoryOrder(categoryRequest.getCategoryOrder());
            optionCategory = optionCategoriesService.save(optionCategory);

            // Item과 OptionCategories 연결
            item.getAvailableOptionCategories().add(optionCategory);

            // ItemOptions 처리
            if (categoryRequest.getOptions() != null) {
                for (ItemOptionRequest optionRequest : categoryRequest.getOptions()) {
                    ItemOption itemOption = new ItemOption();
                    itemOption.setOptionName(optionRequest.getOptionName());
                    itemOption.setOptionPrice(optionRequest.getOptionPrice());
                    itemOption.setOptionOrder(optionRequest.getOptionOrder());
                    itemOption.setOptionAvailable(optionRequest.isOptionAvailable());
                    itemOption.setOptionCategories(optionCategory);
                    itemOptionService.save(itemOption);
                }
            }

            optionCategories.add(optionCategory);
        }

        // 5. Item과 OptionCategories 연결
        item.setAvailableOptionCategories(optionCategories);
        item = itemRepository.save(item);

        // 6. 생성된 메뉴의 상세 정보 반환
        return getItemDetail(item.getItemId());
    }

    @Transactional
    public ItemDetailDTO updateMenu(Long itemId, MenuCreateRequest request) {
        // 1. 기존 Item 조회
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // 2. Detail 업데이트
        Detail detail = item.getDetailId();
        detail.setDetailKcal(request.getDetailKcal());
        detail.setDetailNa(request.getDetailNa());
        detail.setDetailGain(request.getDetailGain());
        detail.setDetailSugar(request.getDetailSugar());
        detail.setDetailSatfat(request.getDetailSatfat());
        detail.setDetailTransfat(request.getDetailTransfat());
        detail.setDetailProtein(request.getDetailProtein());
        detail.setDetailCaffeine(request.getDetailCaffeine());
        detail = detailService.save(detail);

        // 3. Item 업데이트
        item.setItemName(request.getItemName());
        item.setItemCategory(request.getItemCategory());
        item.setItemSubCategory(request.getItemSubCategory());
        item.setItemMenuDetail(request.getItemMenuDetail());
        item.setItemPrice(request.getItemPrice());
        item.setItemSoldout(request.isItemSoldout());
        item.setItemMakeTime(request.getItemMakeTime());
        item.setDetailId(detail);
        item = itemRepository.save(item);

        // 4. 기존 OptionCategories와 ItemOption 삭제
        List<OptionCategories> existingCategories = item.getAvailableOptionCategories();
        if (existingCategories != null) {
            existingCategories.forEach(category -> {
                List<ItemOption> options = category.getOptions();
                if (options != null) {
                    options.forEach(itemOptionService::delete);
                }
                optionCategoriesService.delete(category);
            });
        }

        // 5. 새로운 OptionCategories와 ItemOption 생성
        List<OptionCategories> optionCategories = request.getOptionCategories().stream()
                .map(categoryRequest -> {
                    OptionCategories optionCategory = new OptionCategories();
                    optionCategory.setCategoryName(categoryRequest.getCategoryName());
                    optionCategory.setCategoryDescription(categoryRequest.getCategoryDescription());
                    optionCategory.setCategoryOrder(categoryRequest.getCategoryOrder());
                    optionCategory = optionCategoriesService.save(optionCategory);

                    final OptionCategories finalOptionCategory = optionCategory;
                    List<ItemOption> options = categoryRequest.getOptions().stream()
                            .map(optionRequest -> {
                                ItemOption itemOption = new ItemOption();
                                itemOption.setOptionName(optionRequest.getOptionName());
                                itemOption.setOptionPrice(optionRequest.getOptionPrice());
                                itemOption.setOptionOrder(optionRequest.getOptionOrder());
                                itemOption.setOptionAvailable(optionRequest.isOptionAvailable());
                                itemOption.setOptionCategories(finalOptionCategory);
                                return itemOptionService.save(itemOption);
                            })
                            .collect(Collectors.toList());

                    optionCategory.setOptions(options);
                    return optionCategory;
                })
                .collect(Collectors.toList());

        // 6. Item과 새로운 OptionCategories 연결
        item.setAvailableOptionCategories(optionCategories);
        item = itemRepository.save(item);

        // 7. 수정된 메뉴의 상세 정보 반환
        return getItemDetail(item.getItemId());
    }

    @Transactional
    public ItemDetailDTO toggleSoldout(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        
        // 현재 품절 상태를 반대로 변경
        item.setItemSoldout(!item.isItemSoldout());
        item = itemRepository.save(item);
        
        return getItemDetail(item.getItemId());
    }

    public List<ItemDTO> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(item -> {
                    ItemPicture itemPicture = itemPictureRepository.findByItem(item);
                    return convertToDTO(item, itemPicture);
                })
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getItemsByCategory(String category) {
        List<Item> items = itemRepository.findByItemCategory(category);
        return items.stream()
                .map(item -> {
                    ItemPicture itemPicture = itemPictureRepository.findByItem(item);
                    return convertToDTO(item, itemPicture);
                })
                .collect(Collectors.toList());
    }

    public ItemDTO getItemByCategoryAndId(String category, Long itemId) {
        Optional<Item> item = itemRepository.findByItemCategoryAndItemId(category, itemId);
        return item.map(itemEntity -> {
            ItemPicture itemPicture = itemPictureRepository.findByItem(itemEntity);
            return convertToDTO(itemEntity, itemPicture);
        })
        .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public ItemDetailDTO getItemDetail(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        ItemPicture itemPicture = itemPictureRepository.findByItem(item);

        ItemDetailDTO dto = new ItemDetailDTO();
        dto.setItemName(item.getItemName());
        dto.setItemMenuDetail(item.getItemMenuDetail());
        dto.setItemPrice(item.getItemPrice());
        dto.setItemSoldout(item.isItemSoldout());
        dto.setItemMakeTime(item.getItemMakeTime());
        dto.setItemPictureUrl(itemPicture != null ? itemPicture.getItemPictureUrl() : null);

        // Detail 정보 설정
        Detail detail = item.getDetailId();
        if (detail != null) {
            DetailDTO detailDTO = new DetailDTO();
            detailDTO.setDetailKcal(detail.getDetailKcal());
            detailDTO.setDetailNa(detail.getDetailNa());
            detailDTO.setDetailGain(detail.getDetailGain());
            detailDTO.setDetailSugar(detail.getDetailSugar());
            detailDTO.setDetailSatfat(detail.getDetailSatfat());
            detailDTO.setDetailTransfat(detail.getDetailTransfat());
            detailDTO.setDetailProtein(detail.getDetailProtein());
            detailDTO.setDetailCaffeine(detail.getDetailCaffeine());
            dto.setDetail(detailDTO);
        }

        // OptionCategories 정보 설정
        List<OptionCategories> optionCategories = item.getAvailableOptionCategories();
        if (optionCategories != null) {
            List<OptionCategoryDTO> optionCategoryDTOs = optionCategories.stream()
                    .map(optionCategory -> {
                        OptionCategoryDTO optionCategoryDTO = new OptionCategoryDTO();
                        optionCategoryDTO.setCategoryName(optionCategory.getCategoryName());
                        optionCategoryDTO.setCategoryDescription(optionCategory.getCategoryDescription());
                        optionCategoryDTO.setCategoryOrder(optionCategory.getCategoryOrder());
                        // Option 정보 설정
                        List<OptionDTO> optionDTOs = optionCategory.getOptions().stream()
                                .map(option -> {
                                    OptionDTO optionDTO = new OptionDTO();
                                    optionDTO.setOptionName(option.getOptionName());
                                    optionDTO.setOptionPrice(option.getOptionPrice());
                                    optionDTO.setOptionOrder(option.getOptionOrder());
                                    optionDTO.setOptionAvailable(option.isOptionAvailable());
                                    return optionDTO;
                                })
                                .collect(Collectors.toList());
                        
                        optionCategoryDTO.setOptions(optionDTOs);
                        return optionCategoryDTO;
                    })
                    .collect(Collectors.toList());
            
            dto.setOptionCategories(optionCategoryDTOs);
        }

        return dto;
    }

    private ItemDTO convertToDTO(Item item, ItemPicture itemPicture) {
        ItemDTO dto = new ItemDTO();
        dto.setItemId(item.getItemId());
        dto.setItemCategory(item.getItemCategory());
        dto.setItemName(item.getItemName());
        dto.setItemSubCategory(item.getItemSubCategory());
        dto.setItemPictureUrl(itemPicture != null ? itemPicture.getItemPictureUrl() : null);
        dto.setItemPrice(item.getItemPrice());
        dto.setItemSoldout(item.isItemSoldout());
        return dto;
    }

    @Transactional
    public void deleteMenu(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // 연관된 OptionCategories와 ItemOption 삭제
        List<OptionCategories> categories = item.getAvailableOptionCategories();
        if (categories != null) {
            categories.forEach(category -> {
                List<ItemOption> options = category.getOptions();
                if (options != null) {
                    options.forEach(itemOptionService::delete);
                }
                optionCategoriesService.delete(category);
            });
        }

        // Detail 삭제
        Detail detail = item.getDetailId();
        if (detail != null) {
            detailService.delete(detail);
        }

        // Item 삭제
        itemRepository.delete(item);
    }

    public List<ItemDTO> getItemsBySubcategory(String category, String subCategory) {
        List<Item> items = itemRepository.findByItemCategoryAndItemSubCategory(category, subCategory);
        return items.stream()
                .map(item -> {
                    ItemPicture itemPicture = itemPictureRepository.findByItem(item);
                    return convertToDTO(item, itemPicture);
                })
                .collect(Collectors.toList());
    }
}
