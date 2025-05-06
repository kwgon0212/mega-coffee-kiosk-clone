package com.megacoffee.kiosk.store.application;

import com.megacoffee.kiosk.store.domain.Store;

import java.util.List;

public interface StoreRepository {
    public Store findById(Long id);
    public Store findByName(String name);
    public Store save(Store store);
    public List<Store> findAll();

    public void delete(Store store);
}
