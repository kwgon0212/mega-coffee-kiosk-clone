package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
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
    public OrderEntity findOrderById(UUID id) {
        return null;
    }

    @Override
    public OrderEntity findOrderByOrderNumber(int orderNumber) {
        return null;
    }
}
