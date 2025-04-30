package com.megacoffee.kiosk.order.domain;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class Order {

    private String memberId;
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
        orderMenu.setOrder(this);
        this.totalPrice += orderMenu.getPrices();
    }

    //== 생성 메서드 ==//

    public static Order createOrder(String memberId, List<OrderMenu> orderMenus , String storeName , int orderNumber) {
        Order order = new Order();
        order.memberId = memberId;
        order.orderCount = orderMenus.size();
        order.orderStatus = OrderStatus.PENDING;
        order.storeName = storeName;
        order.orderNumber = orderNumber;
        order.orderDateTime = LocalDateTime.now();
        for (OrderMenu orderMenu : orderMenus) {
            order.addOrderMenu(orderMenu);
        }
        return order;
    }

    //== 비즈니스 로직 ==//


    /**
     * 주문 취소
     */
    public void cancelOrder() {
        if (orderStatus == OrderStatus.COMPLETED) {
            throw new IllegalStateException("주문이 이미 완료되어 취소할 수 없습니다.");
        } else if (orderStatus == OrderStatus.CANCELLED) {
            throw new IllegalStateException("주문이 이미 취소되었습니다.");
        }
        this.orderStatus = OrderStatus.CANCELLED;
        for (OrderMenu orderMenu : orderMenus) {
            orderMenu.cancelOrderMenu();
        }
    }
}
