package com.megacoffee.kiosk.itemoption.domain;

import com.megacoffee.kiosk.ordermenu.domain.OrderMenu;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ItemOption {

    @Id @GeneratedValue
    @Column(name = "itemoption_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordermenu_id")
    private OrderMenu orderMenu;
}
