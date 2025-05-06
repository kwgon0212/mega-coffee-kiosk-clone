package com.megacoffee.kiosk.order.application.port.outbound;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.domain.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface OrderRepository {
    public UUID save(OrderEntity orderEntity);
    public OrderEntity findById(UUID id);
    public OrderEntity findByOrderNumber(int orderNumber);
    public List<OrderEntity> findAll();
    public List<OrderEntity> findAll(UUID memberId);
    public int findMaxOrderNumber(LocalDateTime start, LocalDateTime end);
}
