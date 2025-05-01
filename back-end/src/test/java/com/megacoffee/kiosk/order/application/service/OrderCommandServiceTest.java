package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.OrderMenuDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class OrderCommandServiceTest {

    @Autowired private OrderCommandService orderCommandService;
    @Autowired private OrderQueryService orderQueryService;

    @Test
    public void 주문저장() {
        //Given
        UUID memberId = UUID.randomUUID();
        OrderRequestDto orderRequestDto = new OrderRequestDto();
        OrderMenuDto orderMenuDto = new OrderMenuDto();
        orderRequestDto.setMemberId(memberId);
        orderRequestDto.setStoreName("중구점");
        orderMenuDto.setItemName("아메리카노");
        orderMenuDto.setItemPrice(4000);
        orderMenuDto.setQuantity(2);
        orderMenuDto.setOptionDtos(null);
        orderRequestDto.setOrderMenus(List.of(orderMenuDto));

        //When
        UUID id = orderCommandService.createOrder(orderRequestDto);

        //Then
        Assertions.assertNotNull(id);
        Assertions.assertNotNull(orderQueryService.findOrderById(id));

    }

}