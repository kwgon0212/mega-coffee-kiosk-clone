package com.megacoffee.kiosk.order.adapter.inbound.web.mapper;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderMenuRequestDto;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import com.megacoffee.kiosk.order.domain.OrderOption;

import java.util.ArrayList;
import java.util.List;

public class OrderMenuDtoMapper {
    public static OrderMenu DtoToDomain(OrderMenuRequestDto dto) {
        List<OrderOption> orderOptions = new ArrayList<>();
        System.out.println("dto.getQuantity() = " + dto.getQuantity());
        if (dto.getOptionDtos() != null) {
            orderOptions = dto.getOptionDtos().stream()
                    .map(OrderOptionDtoMapper::DtoToDomain)
                    .toList();
        }
        return OrderMenu.createOrderMenu(
                dto.getItemName(),
                dto.getItemPrice(),
                dto.getQuantity(),
                orderOptions
        );
    }
}
