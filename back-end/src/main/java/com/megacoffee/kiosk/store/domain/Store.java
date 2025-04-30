package com.megacoffee.kiosk.store.domain;

import lombok.Getter;

@Getter
public class Store {
    private String name;
    private Address address;

    //== 생성 메서드 ==//
    public static Store createStore(String name, Address address) {
        Store store = new Store();
        store.name = name;
        store.address = address;
        return store;
    }
}
