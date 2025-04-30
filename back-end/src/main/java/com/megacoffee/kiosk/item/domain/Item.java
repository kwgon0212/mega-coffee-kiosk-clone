package com.megacoffee.kiosk.item.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Item {
    @Id @GeneratedValue
    @Column(name = "item_id")
    private Long id;
    private int price;
    private String itemName;
}
