package com.megacoffee.kiosk.optioncategories.application;

import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionCategoriesRepository extends JpaRepository<OptionCategories, Long> {
}
