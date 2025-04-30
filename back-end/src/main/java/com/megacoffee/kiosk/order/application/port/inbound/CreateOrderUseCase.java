package com.megacoffee.kiosk.order.application.port.inbound;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.OrderRequestDto;

public interface CreateOrderUseCase {
    public void createOrder(OrderRequestDto orderRequestDto);
    public int OrderNumberByDate();
}
