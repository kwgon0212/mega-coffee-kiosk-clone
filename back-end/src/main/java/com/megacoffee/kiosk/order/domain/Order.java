package com.megacoffee.kiosk.order.domain;

import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.ordermenu.domain.OrderMenu;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "order_count")
    private int orderCount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderMenu> orderMenus = new ArrayList<>();

    @Column(name = "order_totalprice")
    private int totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @Column(name = "order_date")
    private LocalDateTime orderDateTime;

    @Column(name = "order_number")
    private int orderNumber;

    //== 연관관계 메서드 ==//

    /**
     * 주문 메뉴 추가
     */
    public void addOrderMenu(OrderMenu orderMenu) {
        orderMenus.add(orderMenu);
        orderMenu.setOrder(this);
        this.totalPrice += orderMenu.getPrices();
    }
    public void settingMember(Member member) {
        this.member = member;
    }

    //== 생성 메서드 ==//

    public static Order createOrder(Member member, List<OrderMenu> orderMenus) {
        Order order = new Order();
        order.orderCount = orderMenus.size();
        order.orderDateTime = LocalDateTime.now();
        order.orderStatus = OrderStatus.PENDING;
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
