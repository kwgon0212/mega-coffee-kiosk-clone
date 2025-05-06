package com.megacoffee.kiosk.store.outbound;

import com.megacoffee.kiosk.store.application.StoreRepository;
import com.megacoffee.kiosk.store.domain.Store;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreRepositoryImpl implements StoreRepository {

    private final EntityManager em;

    @Override
    public Store findById(Long id) {
        return em.find(Store.class, id);
    }

    @Override
    public Store findByName(String name) {
        return em.createQuery("SELECT s FROM Store s WHERE s.name = :name", Store.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    @Transactional
    public Store save(Store store) {
        em.persist(store);
        return store;
    }

    @Override
    public List<Store> findAll() {
        return em.createQuery("SELECT s FROM Store s", Store.class)
                .getResultList();
    }

    @Override
    @Transactional
    public void delete(Store store) {
        em.remove(store);
    }
}
