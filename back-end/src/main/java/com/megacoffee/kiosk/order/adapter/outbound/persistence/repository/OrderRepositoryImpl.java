package com.megacoffee.kiosk.order.adapter.outbound.persistence.repository;

import com.megacoffee.kiosk.order.adapter.outbound.persistence.OrderEntity;
import com.megacoffee.kiosk.order.application.port.outbound.OrderRepository;
import com.megacoffee.kiosk.order.domain.Order;
import com.megacoffee.kiosk.order.domain.OrderStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderRepositoryImpl implements OrderRepository {

    private final EntityManager em;

    @Override
    @Transactional
    public UUID save(OrderEntity orderEntity) {
        em.persist(orderEntity);
        return orderEntity.getId();
    }

    @Override
    public OrderEntity findById(UUID id) {
        return em.find(OrderEntity.class, id);
    }

    @Override
    public OrderEntity findByOrderNumber(int orderNumber) {
        return em.createQuery("SELECT o FROM OrderEntity o WHERE o.orderNumber = :orderNumber", OrderEntity.class)
                .setParameter("orderNumber", orderNumber)
                .getSingleResult();
    }

    @Override
    public List<OrderEntity> findAll() {
        return em.createQuery("SELECT o FROM OrderEntity o", OrderEntity.class)
                .getResultList();
    }

    @Override
    public List<OrderEntity> findAll(UUID memberId) {
        return em.createQuery("SELECT o FROM OrderEntity o WHERE o.memberId = :memberId", OrderEntity.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    @Override
    public int findMaxOrderNumber(LocalDateTime start, LocalDateTime end) {
        Integer maxNum = em.createQuery("SELECT MAX(o.orderNumber) FROM OrderEntity o WHERE o.orderDate BETWEEN :start AND :end", Integer.class)
                .setParameter("start", start)
                .setParameter("end", end)
                .getSingleResult();
        return maxNum == null ? 1 : maxNum + 1;
    }

}
