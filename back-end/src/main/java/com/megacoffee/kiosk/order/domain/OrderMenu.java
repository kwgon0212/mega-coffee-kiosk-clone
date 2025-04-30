package com.megacoffee.kiosk.order.domain;

import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class OrderMenu {

    private Order order;
    private String itemName;
    private int itemCount;
    private int itemPrice;
    private ItemOption option;
    private int prices;
    private OptionCategories optionCategories;
    private List<OrderOption> orderOptions = new ArrayList<>();
    private OrderMenuStatus orderMenuStatus;
    //== 연관관계 메서드 ==//
    public void setOrder(Order order) {
        this.order = order;
        order.getOrderMenus().add(this);
    }
    public void addOrderOption(OrderOption orderOption) {
        orderOptions.add(orderOption);
        orderOption.assignOrderMenu(this);
        prices += orderOption.getOptionPrice();
    }

    //== 생성 메서드 ==//
    public static OrderMenu createOrderMenu(String itemName , int itemPrice , int itemCount, List<OrderOption> orderOptions) {
        OrderMenu orderMenu = new OrderMenu();
        orderMenu.itemCount = itemCount;
        orderMenu.itemPrice = itemPrice;
        orderMenu.itemName = itemName;
        orderMenu.prices = itemPrice * itemCount;
        for (OrderOption orderOption : orderOptions) {
            orderMenu.addOrderOption(orderOption);
        }
        orderMenu.orderMenuStatus = OrderMenuStatus.IN_PROGRESS;
        return orderMenu;
    }

    //== 비즈니스 로직 ==//

    /**
     * 주문 메뉴 취소
     */

    public void cancelOrderMenu() {
        if (orderMenuStatus == OrderMenuStatus.CANCELED) {
            throw new IllegalStateException("이미 취소된 주문 메뉴입니다.");
        }
        this.orderMenuStatus = OrderMenuStatus.CANCELED;
        this.itemCount = 0;
        this.prices = -prices;
    }
}
