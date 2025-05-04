package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OptionDTO {
    private String optionName;
    private Integer optionPrice;
    private Integer optionOrder;
    private boolean optionAvailable;
}