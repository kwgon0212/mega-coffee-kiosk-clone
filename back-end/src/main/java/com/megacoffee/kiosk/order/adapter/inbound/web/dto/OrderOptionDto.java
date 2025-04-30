package com.megacoffee.kiosk.order.adapter.inbound.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderOptionDto {

    private String optionName;
    private int optionPrice;
}
