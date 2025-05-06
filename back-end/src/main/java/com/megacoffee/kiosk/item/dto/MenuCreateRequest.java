package com.megacoffee.kiosk.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MenuCreateRequest {
    // Item 정보
    private String itemName;
    private String itemCategory;
    private String itemSubCategory;
    private String itemMenuDetail;
    private Integer itemPrice;
    private boolean itemSoldout;
    private Integer itemMakeTime;
    private MultipartFile itemImage;

    // Detail 정보
    private float detailKcal;
    private float detailNa;
    private float detailGain;
    private float detailSugar;
    private float detailSatfat;
    private float detailTransfat;
    private float detailProtein;
    private float detailCaffeine;

    // OptionCategories와 ItemOption 정보
    private List<OptionCategoryRequest> optionCategories;
}


