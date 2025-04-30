package com.megacoffee.kiosk.optioncategories.domain;

import com.megacoffee.kiosk.order.domain.OrderMenu;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class OptionCategories {

    @Id @GeneratedValue
    @Column(name = "optioncategories_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordermenu_id")
    private OrderMenu orderMenu;
}
