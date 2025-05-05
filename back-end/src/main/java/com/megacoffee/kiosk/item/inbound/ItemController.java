package com.megacoffee.kiosk.item.inbound;

import com.megacoffee.kiosk.item.application.ItemService;
import com.megacoffee.kiosk.item.dto.ItemDetailDTO;
import com.megacoffee.kiosk.item.dto.ItemDTO;
import com.megacoffee.kiosk.item.dto.MenuCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    // /menus : 전체 메뉴 조회, /menus?category=coffee : 커피 메뉴 조회, /menus?category=coffee&subcategory=latte : 커피에서 라떼 메뉴 조회
    @GetMapping("/menus")
    public ResponseEntity<List<ItemDTO>> getItems(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory
    ) {
        if (category != null && subcategory != null) {
            return ResponseEntity.ok(itemService.getItemsBySubcategory(category, subcategory));
        }

        else if (category != null && subcategory == null) {
            return ResponseEntity.ok(itemService.getItemsByCategory(category));
        }

        return ResponseEntity.ok(itemService.getAllItems());
    }

    // 특정 메뉴 조회
    @GetMapping("/menus/item/{itemId}")
    public ResponseEntity<ItemDetailDTO> getItemDetail(@PathVariable Long itemId) {
        ItemDetailDTO itemDetail = itemService.getItemDetail(itemId);
        return ResponseEntity.ok(itemDetail);
    }

    // 메뉴 추가
    @PostMapping(value = "/admin/addMenus", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemDetailDTO> addMenu(@ModelAttribute MenuCreateRequest request) {
        ItemDetailDTO createdMenu = itemService.createMenu(request);
        return ResponseEntity.ok(createdMenu);
    }

    // 메뉴 수정
    @PostMapping("/admin/editMenus/{itemId}")
    public ResponseEntity<ItemDetailDTO> editMenu(@PathVariable Long itemId, @RequestBody MenuCreateRequest request) {
        ItemDetailDTO updatedMenu = itemService.updateMenu(itemId, request);
        return ResponseEntity.ok(updatedMenu);
    }

    // 메뉴 품절 전환
    @PostMapping("/admin/editMenus/{itemId}/soldout")
    public ResponseEntity<ItemDetailDTO> toggleSoldout(@PathVariable Long itemId) {
        ItemDetailDTO updatedMenu = itemService.toggleSoldout(itemId);
        return ResponseEntity.ok(updatedMenu);
    }

    // 메뉴 삭제
    @DeleteMapping("/admin/deleteMenus/{itemId}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long itemId) {
        itemService.deleteMenu(itemId);
        return ResponseEntity.noContent().build();
    }
}
