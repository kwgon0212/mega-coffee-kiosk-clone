package com.megacoffee.kiosk.itemoption.application;

import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemOptionRepository extends JpaRepository<ItemOption, Long> {
}
