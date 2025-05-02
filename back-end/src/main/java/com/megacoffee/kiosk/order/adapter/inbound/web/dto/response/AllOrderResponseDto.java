package com.megacoffee.kiosk.order.adapter.inbound.web.dto.response;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 응답 DTO")
public class AllOrderResponseDto {

    @Schema(description = "주문 ID")
    private UUID orderId;

    @Schema(description = "주문 매장 이름")
    private String storeName;

    @Schema(description = "주문 번호")
    private Integer orderNumber;

    @Schema(description = "주문 날짜")
    private LocalDateTime orderTime;

    @Schema(description = "주문 상태")
    private OrderStatus orderStatus;

    @Schema(description = "주문 수량")
    private Integer orderCount;

    @Schema(description = "주문 메뉴")
    private List<OrderMenuDto> orderMenus;

//    @Schema(description = "주문 총 가격")
//    private int totalPrice;
//


    public static AllOrderResponseDto from(OrderEntity orderEntity) {
        List<OrderMenuDto> menus = orderEntity.getOrderMenus().stream()
                .map(OrderMenuDto::from)
                .toList();
        return new AllOrderResponseDto(
                orderEntity.getId(),
                orderEntity.getStoreName(),
                orderEntity.getOrderNumber(),
                orderEntity.getOrderDate(),
                orderEntity.getOrderStatus(),
                orderEntity.getOrderCount(),
                menus
//                orderEntity.getTotalPrice(),

        );
    }

}
