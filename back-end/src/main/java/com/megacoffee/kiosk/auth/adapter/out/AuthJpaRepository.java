package com.megacoffee.kiosk.auth.adapter.out;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthJpaRepository extends JpaRepository<AuthEntity, UUID> {
    Optional<AuthEntity> findByAccount(String account);
    Optional<AuthEntity> findByMemberId(UUID memberId);


}
