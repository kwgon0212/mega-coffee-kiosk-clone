package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OptionCategoryDTO {
    private String categoryName;
    private String categoryDescription;
    private Integer categoryOrder;
    private List<OptionDTO> options;
}