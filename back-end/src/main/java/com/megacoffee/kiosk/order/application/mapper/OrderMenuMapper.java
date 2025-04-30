package com.megacoffee.kiosk.order.application.mapper;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderOptionEntity;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import com.megacoffee.kiosk.order.domain.OrderOption;

import java.util.List;

public class OrderMenuMapper {
    public static OrderMenuEntity toEntity(OrderMenu orderMenu) {
        return OrderMenuEntity.createOrderMenuEntity(
                orderMenu.getItemName(),
                orderMenu.getItemCount(),
                orderMenu.getItemPrice()
        );
    }

    public static OrderMenu toDomain(OrderMenuEntity orderMenuEntity) {
        List<OrderOptionEntity> orderOptionEntities = orderMenuEntity.getOrderOptions();
        List<OrderOption> orderOptions = orderOptionEntities.stream()
                .map(OrderOptionMapper::toDomain)
                .toList();
        OrderMenu orderMenu = OrderMenu.createOrderMenu(
                orderMenuEntity.getItemName(),
                orderMenuEntity.getPrices(),
                orderMenuEntity.getQuantity(),
                orderOptions
        );
        return orderMenu;
    }
}
