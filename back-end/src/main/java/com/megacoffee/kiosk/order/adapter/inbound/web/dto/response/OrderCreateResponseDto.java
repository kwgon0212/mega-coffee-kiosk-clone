package com.megacoffee.kiosk.order.adapter.inbound.web.dto.response;

import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 생성 응답 DTO")
public class OrderCreateResponseDto {
    private Integer orderNumber;
    private OrderStatus status;
    private Integer OrderNumber;

    public static OrderCreateResponseDto from(Order order) {
        return new OrderCreateResponseDto(order.getOrderNumber(),order.getOrderStatus(), order.getOrderNumber());
    }
}
