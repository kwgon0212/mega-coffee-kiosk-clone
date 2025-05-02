package com.megacoffee.kiosk.optioncategories.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.megacoffee.kiosk.item.domain.Item;
import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@ToString(exclude = {"items", "options"})
@Table(name = "option_categories")
@Getter
@Setter
@NoArgsConstructor
public class OptionCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    private String categoryName;
    private String categoryDescription;
    private Integer categoryOrder;

    @JsonIgnore
    @ManyToMany(mappedBy = "availableOptionCategories")
    private List<Item> items;

    @OneToMany(mappedBy = "optionCategories")
    private List<ItemOption> options;
}
