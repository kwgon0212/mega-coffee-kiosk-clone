package com.megacoffee.kiosk.item.application;

import com.megacoffee.kiosk.item.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
