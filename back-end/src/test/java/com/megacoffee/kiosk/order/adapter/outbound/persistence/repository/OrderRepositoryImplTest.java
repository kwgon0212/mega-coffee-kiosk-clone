package com.megacoffee.kiosk.order.adapter.outbound.persistence.repository;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderMenuEntity;
import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class OrderRepositoryImplTest {

    @Autowired
    OrderRepository repository;

    @Test
    void save() {
        // Given
        List<OrderMenuEntity> orderMenuEntities = new ArrayList<>();
        orderMenuEntities.add(OrderMenuEntity.createOrderMenuEntity("아메리카노", 4000, 2));
        OrderEntity orderEntity = OrderEntity.createOrderEntity("중구점", 10, orderMenuEntities );

        // When
        UUID id = repository.save(orderEntity);

        // Then
        Assertions.assertThat(id).isEqualTo(orderEntity.getId());
    }

}