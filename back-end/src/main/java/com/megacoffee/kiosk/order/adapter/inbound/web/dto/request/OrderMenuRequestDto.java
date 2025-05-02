package com.megacoffee.kiosk.order.adapter.inbound.web.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 생성 요청 DTO")
public class OrderMenuRequestDto {
    private String itemName;
    private Integer itemPrice;
    private Integer quantity;
    private List<OrderOptionRequestDto> options;
}
