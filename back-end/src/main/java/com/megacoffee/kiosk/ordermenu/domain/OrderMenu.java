package com.megacoffee.kiosk.ordermenu.domain;

import com.megacoffee.kiosk.item.domain.Item;
import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.orderoption.domain.OrderOption;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderMenu {

    @Id @GeneratedValue
    @Column(name = "ordermenu_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id")
    private ItemOption option;

    @Column(name = "order_count")
    private int orderCount;

    @Column(name = "order_price")
    private int prices;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "optioncategories_id")
    private OptionCategories optionCategories;

    @OneToMany(mappedBy = "ordermenu", cascade = CascadeType.ALL)
    private List<OrderOption> orderOptions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private OrderMenuStatus orderMenuStatus;
    //== 연관관계 메서드 ==//
    public void setOrder(Order order) {
        this.order = order;
        order.getOrderMenus().add(this);
    }

    public void settingItem(Item item) {
        this.item = item;
    }

    public void addOrderOption(OrderOption orderOption) {
        orderOptions.add(orderOption);
        orderOption.setOrderMenu(this);
        prices += orderOption.getOptionPrice();
    }

    //== 생성 메서드 ==//
    public static OrderMenu createOrderMenu(Item item, int orderCount) {
        OrderMenu orderMenu = new OrderMenu();
        orderMenu.settingItem(item);
        orderMenu.orderCount = orderCount;
        orderMenu.prices = item.getPrice() * orderCount;
        orderMenu.orderMenuStatus = OrderMenuStatus.ORDERED;
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
        this.orderCount = 0;
        this.prices = -prices;
    }
}
