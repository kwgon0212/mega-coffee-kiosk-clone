package com.megacoffee.kiosk.order.adapter.inbound.web.dto.request;

import com.megacoffee.kiosk.order.domain.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StatusRequestDto {
    private OrderStatus orderStatus;
}
