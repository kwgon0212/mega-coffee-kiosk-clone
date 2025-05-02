package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.OrderMenuDto;
import com.megacoffee.kiosk.order.adapter.inbound.web.dto.request.OrderRequestDto;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
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

    public void 상태변화() {
        //Given



        //When

        //Then

    }

}