package com.megacoffee.kiosk.itempicture.application;

import com.megacoffee.kiosk.item.domain.Item;
import com.megacoffee.kiosk.itempicture.domain.ItemPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemPictureRepository extends JpaRepository<ItemPicture, Long> {
    ItemPicture findByItem(Item item);
}