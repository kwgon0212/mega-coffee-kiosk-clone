package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemDTO {
    private Long itemId;
    private String itemName;
    private String itemCategory;
    private String itemSubCategory;
    private String itemPictureUrl;
    private Integer itemPrice;
    private boolean itemSoldout;
} 