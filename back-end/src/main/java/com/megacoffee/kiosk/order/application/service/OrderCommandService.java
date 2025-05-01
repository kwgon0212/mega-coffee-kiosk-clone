package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.mapper.OrderDtoMapper;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.application.mapper.OrderDomainMapper;
import com.megacoffee.kiosk.order.application.port.inbound.CreateOrderUseCase;
import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderCommandService implements CreateOrderUseCase {

    private final OrderRepository orderRepository;
    private final OrderNumberQueryService orderNumberQueryService;

    //== 주문 생성 ==//
    @Override
    public Order createOrder(UUID userId, OrderRequestDto orderRequestDto) {
        // 주문 번호 생성
        int orderNumber = orderNumberQueryService.generateOrderNumber();
        // DTO -> Domain 변환
        Order order = OrderDtoMapper.DtoToDomain(userId,orderRequestDto, orderNumber);
        // Domain -> Entity 변환
        OrderEntity orderEntity = OrderDomainMapper.toEntity(order);
        // 주문 저장
        orderRepository.save(orderEntity);

        return order;
    }

    //== 주문 상태 수정 ==//
    public OrderEntity updateState(UUID orderId, OrderStatus newStatus) {
        // 주문 상태 업데이트
        OrderEntity orderEntity = orderRepository.findById(orderId);
        orderEntity.changeOrderStatus(newStatus);
        return orderEntity;
    }
}
