package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderNumberQueryService {
    private final OrderRepository orderRepository;
    public int generateOrderNumber() {
        // 오늘 날짜를 기준으로 주문 번호를 조회
        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime todayEnd = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59).withNano(999999999);

        // 오늘 날짜의 주문 중 가장 큰 주문 번호를 조회
        int maxOrderNumber = orderRepository.findMaxOrderNumber(todayStart, todayEnd);

        // 다음 주문 번호 반환
        return maxOrderNumber;
    }
}
