package com.megacoffee.kiosk.order.adapter.inbound.web.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문에서 주문 메뉴 추출")
public class OrderOptionRequestDto {

    private String optionName;
    private int optionPrice;
}
