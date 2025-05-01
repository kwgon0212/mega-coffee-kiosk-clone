package com.megacoffee.kiosk.order.application.mapper;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderOptionEntity;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import com.megacoffee.kiosk.order.domain.OrderOption;

import java.util.ArrayList;
import java.util.List;

public class OrderDomainMapper {
    public static OrderEntity toEntity(Order domain) {
        List<OrderMenuEntity> orderMenuEntityList = new ArrayList<>();
        if (domain.getOrderMenus() != null) {
            orderMenuEntityList = domain.getOrderMenus().stream().
                    map(OrderMenuMapper::toEntity)
                    .toList();
        }
        return OrderEntity.createOrderEntity(
                domain.getMemberId(),
                domain.getOrderCount(),
                domain.getStoreName(),
                domain.getOrderNumber(),
                orderMenuEntityList,
                domain.getTotalPrice()
        );
    }

    public static Order toDomain(OrderEntity entity) {
        List<OrderMenu> orderMenus = new ArrayList<>();
        if (entity.getOrderMenus() != null) {
            orderMenus = entity.getOrderMenus().stream()
                    .map(OrderMenuMapper::toDomain)
                    .toList();
        }
        return Order.createOrder(
                entity.getMemberId(),
                orderMenus,
                entity.getStoreName(),
                entity.getOrderNumber()
        );
    }
}
