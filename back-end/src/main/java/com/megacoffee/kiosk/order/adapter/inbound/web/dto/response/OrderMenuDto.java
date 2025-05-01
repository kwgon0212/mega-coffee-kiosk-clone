package com.megacoffee.kiosk.order.adapter.inbound.web.dto.response;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 메뉴 응답 DTO")
public class OrderMenuDto {
    private String itemName;
    private int itemPrice;
    private int itemCount;
    private List<OrderOptionDto> options;

    public static OrderMenuDto from(OrderMenuEntity entity) {
        return new OrderMenuDto(
          entity.getItemName(),
          entity.getPrices(),
          entity.getQuantity(),
          entity.getOrderOptions().stream()
            .map(OrderOptionDto::from)
            .toList()
        );
    }

}
