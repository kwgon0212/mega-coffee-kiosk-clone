package com.megacoffee.kiosk.optioncategories.application;

import com.megacoffee.kiosk.optioncategories.domain.OptionCategories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OptionCategoriesService {
    private final OptionCategoriesRepository optionCategoriesRepository;

    @Transactional
    public OptionCategories save(OptionCategories optionCategories) {
        return optionCategoriesRepository.save(optionCategories);
    }

    @Transactional
    public void delete(OptionCategories optionCategories) {
        optionCategoriesRepository.delete(optionCategories);
    }
}
