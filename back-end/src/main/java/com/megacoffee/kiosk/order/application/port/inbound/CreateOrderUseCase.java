package com.megacoffee.kiosk.order.application.port.inbound;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderStatus;

import java.util.UUID;

public interface CreateOrderUseCase {
    public Order createOrder(UUID userId, OrderRequestDto orderRequestDto);
    public void changeOrderStatus(UUID orderId, OrderStatus newStatus);
}
