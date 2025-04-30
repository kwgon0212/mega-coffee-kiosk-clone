package com.megacoffee.kiosk.order.domain;

import lombok.Getter;

@Getter
public class OrderOption {

    private OrderMenu orderMenu;
    private String optionName;
    private int optionPrice;

    //== 연관관계 메서드 ==//
    public void assignOrderMenu(OrderMenu orderMenu) {
        this.orderMenu = orderMenu;
    }

    //== 생성 메서드 ==//
    public static OrderOption createOrderOption(String optionName, int optionPrice) {
        OrderOption orderOption = new OrderOption();
        orderOption.optionName = optionName;
        orderOption.optionPrice = optionPrice;
        return orderOption;
    }


}
