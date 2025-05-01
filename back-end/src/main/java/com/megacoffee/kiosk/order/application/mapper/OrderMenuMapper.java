package com.megacoffee.kiosk.order.application.mapper;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderOptionEntity;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import com.megacoffee.kiosk.order.domain.OrderOption;

import java.util.ArrayList;
import java.util.List;

public class OrderMenuMapper {
    public static OrderMenuEntity toEntity(OrderMenu orderMenu) {
        List<OrderOptionEntity> orderOptionEntities = new ArrayList<>();
        System.out.println("orderOptionEntities = " + orderMenu.getItemCount());
        if (orderMenu.getOrderOptions() != null) {
            orderOptionEntities = orderMenu.getOrderOptions().stream()
                    .map(OrderOptionMapper::toEntity)
                    .toList();
        }
        return OrderMenuEntity.createOrderMenuEntity(
                orderOptionEntities,
                orderMenu.getItemName(),
                orderMenu.getItemPrice(),
                orderMenu.getItemCount()
        );
    }


    public static OrderMenu toDomain(OrderMenuEntity orderMenuEntity) {
        List<OrderOption> orderOptions = new ArrayList<>();
        if (orderMenuEntity.getOrderOptions() != null) {
            orderOptions = orderMenuEntity.getOrderOptions().stream()
                    .map(OrderOptionMapper::toDomain)
                    .toList();
        }
        return OrderMenu.createOrderMenu(
                orderMenuEntity.getItemName(),
                orderMenuEntity.getPrices(),
                orderMenuEntity.getQuantity(),
                orderOptions
        );
    }
}
