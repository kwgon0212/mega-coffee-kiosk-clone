package com.megacoffee.kiosk.order.adapter.inbound.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuDto {
    private String itemName;
    private int itemPrice;
    private int quantity;
    private List<OrderOptionDto> options;


}
