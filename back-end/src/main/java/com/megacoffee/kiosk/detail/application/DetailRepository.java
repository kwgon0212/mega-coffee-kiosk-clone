package com.megacoffee.kiosk.detail.application;

import com.megacoffee.kiosk.detail.domain.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailRepository extends JpaRepository<Detail, Long> {
}
