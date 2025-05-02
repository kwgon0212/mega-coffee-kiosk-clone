package com.megacoffee.kiosk.order.adapter.inbound.web.mapper;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderMenu;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OrderDtoMapper {
    public static Order DtoToDomain(UUID userId, OrderRequestDto orderRequestDto , int orderNumber) {
        List<OrderMenu> orderMenus = new ArrayList<>();
        if (orderRequestDto.getItems() != null) {
            orderMenus = orderRequestDto.getItems().stream()
                    .map(OrderMenuDtoMapper::DtoToDomain)
                    .toList();
        }
        return Order.createOrder(
                userId,
                orderMenus,
                orderRequestDto.getStoreName(),
                orderNumber
        );
    }
}
