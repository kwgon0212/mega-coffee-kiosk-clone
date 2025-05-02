package com.megacoffee.kiosk.itemoption.domain;

import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString(exclude = {"optionCategories"})
@Table(name = "item_option")
@Getter
@Setter
@NoArgsConstructor
public class ItemOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private OptionCategories optionCategories;

    private String optionName;
    private Integer optionPrice;
    private Integer optionOrder;
    private boolean optionAvailable;
}
