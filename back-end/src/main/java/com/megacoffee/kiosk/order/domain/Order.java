package com.megacoffee.kiosk.order.domain;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class Order {

    private UUID memberId;
    private int orderNumber;
    private int orderCount;
    private List<OrderMenu> orderMenus = new ArrayList<>();
    private int totalPrice;
    private OrderStatus orderStatus;
    private String storeName;
    private LocalDateTime orderDateTime;
    //== 연관관계 메서드 ==//

    /**
     * 주문 메뉴 추가
     */
    public void addOrderMenu(OrderMenu orderMenu) {
        orderMenus.add(orderMenu);
        orderMenu.setOrderEntity(this);
        orderCount += orderMenu.getItemCount();
        totalPrice += orderMenu.calculatePrice();
    }

    //== 생성 메서드 ==//

    public static Order createOrder(UUID memberId, List<OrderMenu> orderMenus , String storeName , int orderNumber) {
        Order order = new Order();
        order.memberId = memberId;
        order.orderStatus = OrderStatus.PAYMENT_DONE;
        order.storeName = storeName;
        order.orderNumber = orderNumber;
        order.orderDateTime = LocalDateTime.now();
        for (OrderMenu orderMenu : orderMenus) {
            order.addOrderMenu(orderMenu);
        }
        order.orderCount = orderMenus.stream()
                .mapToInt(OrderMenu::getItemCount)
                .sum();
        return order;
    }

    //== 비즈니스 로직 ==//
//    public void changeOrderStatus(OrderStatus orderStatus) {
//        if (this.orderStatus == OrderStatus.COMPLETED) {
//            throw new IllegalStateException("주문이 이미 완료되어 상태를 변경할 수 없습니다.");
//        } else if (this.orderStatus == OrderStatus.CANCELLED) {
//            throw new IllegalStateException("주문이 이미 취소되어 상태를 변경할 수 없습니다.");
//        }
//        this.orderStatus = orderStatus;
//    }

}
