package com.megacoffee.kiosk.order.adapter.inbound.web.dto.response;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderOptionEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 옵션 응답 dto")
public class OrderOptionDto {
    private String optionName;
    private int optionPrice;

    public static OrderOptionDto from(OrderOptionEntity orderOptionEntity) {
        return new OrderOptionDto(
                orderOptionEntity.getOptionName(),
                orderOptionEntity.getOptionPrice()
        );

    }
}
