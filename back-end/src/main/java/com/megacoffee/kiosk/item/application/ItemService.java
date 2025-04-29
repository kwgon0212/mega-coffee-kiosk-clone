package com.megacoffee.kiosk.item.application;

import com.megacoffee.kiosk.item.domain.Item;
import com.megacoffee.kiosk.item.dto.ItemDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    public List<ItemDTO> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ItemDTO convertToDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setItemCategory(item.getItemCategory());
        dto.setItemName(item.getItemName());
        dto.setItemPrice(item.getItemPrice());
        dto.setItemSoldout(item.isItemSoldout());
        return dto;
    }
}
