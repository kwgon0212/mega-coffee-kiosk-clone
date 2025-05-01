package com.megacoffee.kiosk.order.adapter.outbound.persistence;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderEntity {

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private MemberEntity member;

    @Column(name = "member_id", nullable = false)
    private UUID memberId;

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private UUID Id;

    @Column(name = "order_number")
    private int orderNumber;

    @Column(name = "order_status")
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "order_count")
    private int orderCount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderMenuEntity> orderMenus = new ArrayList<>();

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "store_name")
    private String storeName;


    //== 생성 메서드 ==//

    public static OrderEntity createOrderEntity(UUID memberId, int menuCount, String storeName, int orderNumber, List<OrderMenuEntity> orderMenus , int totalPrice) {
        OrderEntity order = new OrderEntity();
        order.memberId = memberId;
        order.storeName = storeName;
        order.orderNumber = orderNumber;
        order.orderStatus = OrderStatus.PENDING;
        order.orderCount = menuCount;
        order.orderDate = LocalDateTime.now();
        for (OrderMenuEntity orderMenu : orderMenus) {
            order.addOrderMenu(orderMenu);
        }
        order.totalPrice = totalPrice;
        return order;
    }

    //== 연관관계 메서드 ==//
    public void addOrderMenu(OrderMenuEntity orderMenu) {
        orderMenus.add(orderMenu);
        orderMenu.setOrderEntity(this);
    }

    public void changeOrderStatus(OrderStatus orderStatus) {
        if (this.orderStatus == OrderStatus.COMPLETED) {
            throw new IllegalStateException("주문이 이미 완료되어 상태를 변경할 수 없습니다.");
        } else if (this.orderStatus == OrderStatus.CANCELLED) {
            throw new IllegalStateException("주문이 이미 취소되어 상태를 변경할 수 없습니다.");
        }
        this.orderStatus = orderStatus;
    }
}
