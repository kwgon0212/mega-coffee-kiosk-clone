package com.megacoffee.kiosk.order.adapter.outbound.persistence;

import com.megacoffee.kiosk.order.domain.OrderStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderEntity {

    @Id @GeneratedValue
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
    private List<OrderMenuEntity> orderMenus = new ArrayList<>();

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "store_name")
    private String storeName;


    //== 생성 메서드 ==//

    public static OrderEntity createOrderEntity(String storeName, int orderNumber, List<OrderMenuEntity> orderMenus) {
        OrderEntity order = new OrderEntity();
        order.storeName = storeName;
        order.orderNumber = orderNumber;
        order.orderStatus = OrderStatus.PENDING;
        order.orderCount = orderMenus.size();
        order.orderDate = LocalDateTime.now();
        for (OrderMenuEntity orderMenu : orderMenus) {
            order.addOrderMenu(orderMenu);
        }
        return order;
    }

    //== 연관관계 메서드 ==//
    public void addOrderMenu(OrderMenuEntity orderMenu) {
        orderMenus.add(orderMenu);
        orderMenu.setOrderEntity(this);
        this.totalPrice += orderMenu.getPrices();
    }

}
