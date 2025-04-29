package com.megacoffee.kiosk.orderoption.domain;

import com.megacoffee.kiosk.ordermenu.domain.OrderMenu;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderOption {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordermenu_id")
    private OrderMenu orderMenu;

    @Column(name = "option_name")
    private String optionName;

    @Column(name = "option_price")
    private int optionPrice;

    //== 연관관계 메서드 ==//
    public void setOrderMenu(OrderMenu ordermenu) {
        orderMenu = ordermenu;
    }

    //== 생성 메서드 ==//
    public static OrderOption createOrderOption(OrderMenu orderMenu, String optionName, int optionPrice) {
        OrderOption orderOption = new OrderOption();
        orderOption.optionName = optionName;
        orderOption.optionPrice = optionPrice;
        return orderOption;
    }


}
