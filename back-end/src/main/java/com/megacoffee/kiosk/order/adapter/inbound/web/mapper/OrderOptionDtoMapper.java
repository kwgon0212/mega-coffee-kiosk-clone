package com.megacoffee.kiosk.order.adapter.inbound.web.mapper;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderOptionRequestDto;
import com.megacoffee.kiosk.order.domain.OrderOption;

public class OrderOptionDtoMapper {
    public static OrderOption DtoToDomain(OrderOptionRequestDto dto) {
        return OrderOption.createOrderOption(
                dto.getOptionName(),
                dto.getOptionPrice()
        );
    }

    public static OrderOptionRequestDto DomainToDto(OrderOption domain) {
        return new OrderOptionRequestDto(
                domain.getOptionName(),
                domain.getOptionPrice()
        );
    }
}
