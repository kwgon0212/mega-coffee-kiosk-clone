package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemDTO {
    private String itemCategory;
    private String itemName;
    private Integer itemPrice;
    private boolean itemSoldout;
} 