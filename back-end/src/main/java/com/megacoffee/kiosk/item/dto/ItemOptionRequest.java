package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemOptionRequest {
    private String optionName;
    private Integer optionPrice;
    private Integer optionOrder;
    private boolean optionAvailable;
} 