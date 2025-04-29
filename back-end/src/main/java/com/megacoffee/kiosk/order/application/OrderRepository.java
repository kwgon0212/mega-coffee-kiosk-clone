package com.megacoffee.kiosk.order.application;

import com.megacoffee.kiosk.order.domain.Order;

import java.util.UUID;

public interface OrderRepository {
    public void save(Order order);
    public Order findById(UUID orderId);
    public Order findByOrderNumber(int orderNumber);

}
