package com.megacoffee.kiosk.order.adapter.outbound.persistence;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "order_menu")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderMenuEntity {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private OrderEntity order;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_prices")
    private int prices;

    @Column(name = "item_quentity")
    private int quantity;

    @OneToMany(mappedBy = "orderMenu", cascade = CascadeType.ALL)
    private List<OrderOptionEntity> orderOptions = new ArrayList<>();

    //== 연관관계 편의 메서드 ==//
    public void setOrderEntity(OrderEntity orderEntity) {
        this.order = orderEntity;
    }

    public void addOrderOption(OrderOptionEntity orderOption) {
        this.orderOptions.add(orderOption);
        orderOption.setOrderMenuEntity(this);
    }

    //== 생성 메서드 ==//
    public static OrderMenuEntity createOrderMenuEntity(List<OrderOptionEntity> orderOptionEntityList,String itemName, int prices, int quantity) {
        OrderMenuEntity orderMenu = new OrderMenuEntity();
        for (OrderOptionEntity orderOption : orderOptionEntityList) {
            orderMenu.addOrderOption(orderOption);
        }
        orderMenu.itemName = itemName;
        orderMenu.prices = prices;
        orderMenu.quantity = quantity;
        return orderMenu;
    }
}
