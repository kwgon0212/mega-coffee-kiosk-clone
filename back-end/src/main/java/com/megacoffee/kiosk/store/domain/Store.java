package com.megacoffee.kiosk.store.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Address address;

    //== 생성자 ==//
    private Store(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    //== 생성 메서드 ==//
    public static Store createStore(String name, Address address) {
        return new Store(name, address);
    }
}
