package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.application.mapper.OrderDomainMapper;
import com.megacoffee.kiosk.order.application.port.inbound.FindOrderUseCase;
import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import com.megacoffee.kiosk.order.domain.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderQueryService implements FindOrderUseCase {

    private final OrderRepository orderRepository;

    @Override
    public List<OrderEntity> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<OrderEntity> findAllOrders(UUID memberId) {
        return orderRepository.findAll(memberId);
    }

    @Override
    public OrderEntity findOrderById(UUID id) {
        OrderEntity orderEntity = orderRepository.findById(id);
        if (orderEntity == null) {
            throw new IllegalArgumentException("Order not found with id: " + id);
        }
        return orderEntity;
    }

    @Override
    public OrderEntity findOrderByOrderNumber(int orderNumber) {
        OrderEntity orderEntity = orderRepository.findByOrderNumber(orderNumber);
        if (orderEntity == null) {
            throw new IllegalArgumentException("Order not found with order number: " + orderNumber);
        }
        return orderEntity;
    }
}
