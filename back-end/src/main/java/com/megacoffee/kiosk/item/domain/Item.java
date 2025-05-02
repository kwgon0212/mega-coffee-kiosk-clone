package com.megacoffee.kiosk.item.domain;

import com.megacoffee.kiosk.detail.domain.Detail;
import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "item")
@ToString(exclude = {"availableOptionCategories"})
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;
    @Column(nullable = false)
    private String itemName;
    private String itemCategory;
    private String itemSubCategory;
    private String itemMenuDetail;
    @Column(nullable = false)
    private Integer itemPrice;
    private Integer itemMakeTime;
    @OneToOne
    @JoinColumn(name = "detail_id")
    private Detail detailId;

    @ManyToMany
    @JoinTable(
        name = "item_option_categories",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<OptionCategories> availableOptionCategories;

    @Column(nullable = false)
    private boolean itemSoldout;
}
