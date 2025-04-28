package com.megacoffee.kiosk.item.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "item")
@ToString
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
    private String itemMenuDetail;
    @Column(nullable = false)
    private Integer itemPrice;

    @Column(name = "detail_id")
    private Long detailId;

    @ElementCollection
    @CollectionTable(
        name = "item_option_categories",
        joinColumns = @JoinColumn(name = "item_id")
    )
    @Column(name = "category_id")
    private List<Long> optionCategoryIds;

    @Column(nullable = false)
    private boolean itemSoldout;
}
