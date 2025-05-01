package com.megacoffee.kiosk.order.application.port.inbound;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.domain.Order;

import java.util.List;
import java.util.UUID;

public interface FindOrderUseCase {
    public List<OrderEntity> findAllOrders();
    public List<OrderEntity> findAllOrders(UUID memberId);
    public OrderEntity findOrderById(UUID id);
    public OrderEntity findOrderByOrderNumber(int orderNumber);
}
