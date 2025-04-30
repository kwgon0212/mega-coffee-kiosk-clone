package com.megacoffee.kiosk.order.application.service;

import com.megacoffee.kiosk.order.adapter.inbound.web.dto.OrderRequestDto;
import com.megacoffee.kiosk.order.application.port.inbound.CreateOrderUseCase;
import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import com.megacoffee.kiosk.order.domain.OrderOption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements CreateOrderUseCase {

    private final OrderRepository orderRepository;

    //== order 생성==//
    public void createOrder(OrderRequestDto orderRequestDto) {
        // 주문 생성 로직
        // 예: 주문 정보를 저장소에 저장
        String memberId = orderRequestDto.getMemberId();
        List<OrderMenu> orderMenus = orderRequestDto.getItems().stream()
                        .map(orderMenuDto -> {
                            List<OrderOption> orderOptions = orderMenuDto.getOptions().stream()
                                    .map(orderOptionDto -> OrderOption.createOrderOption(orderOptionDto.getOptionName(), orderOptionDto.getOptionPrice()))
                                    .toList();
                            return OrderMenu.createOrderMenu(orderMenuDto.getItemName(), orderMenuDto.getItemPrice() , orderMenuDto.getQuantity(), orderOptions);
                        }).toList();
        Order order = Order.createOrder(memberId, orderMenus, orderRequestDto.getStoreName(), OrderNumberByDate());

    }

    //== 주문 번호 조회 ==//
    public int OrderNumberByDate() {
        // 오늘 날짜를 기준으로 주문 번호를 조회
        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime todayEnd = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59).withNano(999999999);

        // 오늘 날짜의 주문 중 가장 큰 주문 번호를 조회
        int maxOrderNumber = orderRepository.findMaxOrderNumber(todayStart, todayEnd);

        // 다음 주문 번호 반환
        return maxOrderNumber + 1;
    }
}
