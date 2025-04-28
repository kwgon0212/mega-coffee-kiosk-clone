package com.megacoffee.kiosk.detail.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Table(name = "detail")
@Getter
@Setter
public class Detail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detailId;

    private float detailKcal;
    private float detailNa;
    private float detailGain;
    private float detailSugar;
    private float detailSatfat;
    private float detailTransfat;
    private float detailProtein;
    private float detailCaffeine;
}
