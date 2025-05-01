package com.megacoffee.kiosk.order.application.mapper;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderOptionEntity;
import com.megacoffee.kiosk.order.domain.OrderOption;

public class OrderOptionMapper {
    public static OrderOption toDomain(OrderOptionEntity entity) {
        return OrderOption.createOrderOption(
                entity.getOptionName(),
                entity.getOptionPrice()
        );
    }

    public static OrderOptionEntity toEntity(OrderOption domain) {
        return OrderOptionEntity.createOrderOptionEntity(
                domain.getOptionName(),
                domain.getOptionPrice()
        );

    }

}
