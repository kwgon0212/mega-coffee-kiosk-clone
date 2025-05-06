package com.megacoffee.kiosk.store.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
    private String street;
    private String city;
    private String zipCode;

    private Coord coord;
}
