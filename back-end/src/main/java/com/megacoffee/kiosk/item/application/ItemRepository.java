package com.megacoffee.kiosk.item.application;

import com.megacoffee.kiosk.item.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByItemCategory(String category);
    Optional<Item> findByItemCategoryAndItemId(String category, Long itemId);
    List<Item> findByItemCategoryAndItemSubCategory(String category, String itemSubCategory);
}
