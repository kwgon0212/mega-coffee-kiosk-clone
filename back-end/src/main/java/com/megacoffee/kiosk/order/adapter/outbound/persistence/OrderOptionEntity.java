package com.megacoffee.kiosk.order.adapter.outbound.persistence;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.megacoffee.kiosk.order.domain.OrderMenu;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderOptionEntity {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordermenu_id")
    @JsonIgnore
    private OrderMenuEntity orderMenu;

    @Column(name = "option_name")
    private String optionName;

    @Column(name = "option_price")
    private int optionPrice;

    //== 연관관계 메서드 ==//
    public void setOrderMenuEntity(OrderMenuEntity orderMenuEntity) {
        this.orderMenu = orderMenuEntity;
    }

    //== 생성 메서드 ==//
    public static OrderOptionEntity createOrderOptionEntity(String optionName, int optionPrice) {
        OrderOptionEntity orderOptionEntity = new OrderOptionEntity();
        orderOptionEntity.optionName = optionName;
        orderOptionEntity.optionPrice = optionPrice;
        return orderOptionEntity;
    }


}
