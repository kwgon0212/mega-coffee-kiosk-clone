package com.megacoffee.kiosk.order.application.mapper;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderMenu;

import java.util.List;

public class OrderDomainMapper {
    public static OrderEntity toEntity(Order domain) {
        List<OrderMenu> orderMenus = domain.getOrderMenus();
        List<OrderMenuEntity> orderMenuEntities = orderMenus.stream()
                .map(orderMenu -> OrderMenuEntity.createOrderMenuEntity(
                        orderMenu.getItemName(),
                        orderMenu.getItemPrice(),
                        orderMenu.getItemCount()
                ))
                .toList();
        return OrderEntity.createOrderEntity(
                domain.getStoreName(),
                domain.getOrderNumber(),
                orderMenuEntities
        );
    }
}
