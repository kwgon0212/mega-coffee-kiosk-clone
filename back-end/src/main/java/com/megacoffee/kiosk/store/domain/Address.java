package com.megacoffee.kiosk.store.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Address {
    private final String street;
    private final String city;
    private final String state;

    public String getAddress() {
        return street + ", " + city + ", " + state;
    }
}
