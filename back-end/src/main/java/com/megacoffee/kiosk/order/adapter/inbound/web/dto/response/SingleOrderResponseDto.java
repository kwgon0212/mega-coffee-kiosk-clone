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
public class SingleOrderResponseDto {

    @Schema(description = "주문 ID")
    private UUID orderId;

    @Schema(description = "주문 번호")
    private Integer orderNumber;

    @Schema(description = "주문 매장 이름")
    private String storeName;

    @Schema(description = "주문 날짜")
    private LocalDateTime orderTime;

    @Schema(description = "주문 상태")
    private OrderStatus orderStatus;

    @Schema(description = "주문 수량")
    private Integer orderCount;

    @Schema(description = "제조하는데 걸리는 시간")
    private Integer itemMakeTime;

    @Schema(description = "주문 메뉴")
    private List<OrderMenuDto> orderMenus;

    @Schema(description = "결제방법")
    private String paymentMethod;

    @Schema(description = "할인 금액")
    private Integer discountPrice;

    public static SingleOrderResponseDto from(OrderEntity orderEntity, Integer itemMakeTime) {
        List<OrderMenuDto> menus = orderEntity.getOrderMenus().stream()
                .map(OrderMenuDto::from)
                .toList();
        return new SingleOrderResponseDto(
                orderEntity.getId(),
                orderEntity.getOrderNumber(),
                orderEntity.getStoreName(),
                orderEntity.getOrderDate(),
                orderEntity.getOrderStatus(),
                orderEntity.getOrderCount(),
                itemMakeTime,
                menus,
                orderEntity.getPaymentMethod(),
                orderEntity.getDiscountPrice()
        );
    }

}
