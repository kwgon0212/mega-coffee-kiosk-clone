package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ItemDetailDTO {
    private String itemName;
    private String itemPictureUrl;
    private String itemMenuDetail;
    private Integer itemPrice;
    private Integer itemMakeTime;
    private boolean itemSoldout;
    private DetailDTO detail;
    private List<OptionCategoryDTO> optionCategories;
}


