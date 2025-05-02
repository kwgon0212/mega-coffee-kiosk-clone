package com.megacoffee.kiosk.order.adapter.outbound.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import com.megacoffee.kiosk.order.domain.PackageOption;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.rmi.server.UID;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderEntity {

    @Column(name = "member_id")
    private UUID memberId;

//    @Column(name = "member_nickname")
//    private String memberNickname;

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
    private List<OrderMenuEntity> orderMenus = new ArrayList<>();

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "discount_price")
    private Integer discountPrice;

    @Column(name = "request_message")
    private String requestMessage;

    @Column(name = "payment_mothod")
    private String paymentMethod;

    @Column(name = "packageOption")
    private PackageOption packageOption;

    @Column(name = "isTakeOut")
    private boolean isTakeOut;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "item_make_time")
    private Integer itemMakeTime;
    //== 생성 메서드 ==//

    public static OrderEntity createOrderEntity(
            UUID memberId, int menuCount, String storeName, int orderNumber, List<OrderMenuEntity> orderMenus , int totalPrice,
            String requestMessage, String paymentMethod, PackageOption packageOption, Integer discountPrice ,boolean isTakeOut,
            String nickname, Integer itemMakeTime
    ) {
        OrderEntity order = new OrderEntity();
        order.memberId =memberId;
        order.storeName = storeName;
        order.orderNumber = orderNumber;
        order.orderStatus = OrderStatus.CONFIRMED;
        order.orderCount = menuCount;
        order.orderDate = LocalDateTime.now();
        for (OrderMenuEntity orderMenu : orderMenus) {
            order.addOrderMenu(orderMenu);
        }
        order.totalPrice = totalPrice;
        order.requestMessage = requestMessage;
        order.paymentMethod = paymentMethod;
        order.packageOption = packageOption;
        order.discountPrice = discountPrice;
        order.isTakeOut = isTakeOut;
        order.nickname = nickname;
        order.itemMakeTime = itemMakeTime;
        return order;
    }

    //== 연관관계 메서드 ==//
    public void addOrderMenu(OrderMenuEntity orderMenu) {
        orderMenus.add(orderMenu);
        orderMenu.setOrderEntity(this);
    }


    //== 비즈니스 로직 ==//
    public void changeOrderStatus(OrderStatus orderStatus) {
        if (this.orderStatus == OrderStatus.COMPLETED) {
            throw new IllegalStateException("주문이 이미 완료되어 상태를 변경할 수 없습니다.");
        }
        this.orderStatus = orderStatus;
    }
}
