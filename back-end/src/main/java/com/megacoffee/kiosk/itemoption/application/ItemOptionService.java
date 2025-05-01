package com.megacoffee.kiosk.itemoption.application;

import com.megacoffee.kiosk.itemoption.domain.ItemOption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ItemOptionService {
    private final ItemOptionRepository itemOptionRepository;

    @Transactional
    public ItemOption save(ItemOption itemOption) {
        return itemOptionRepository.save(itemOption);
    }

    @Transactional
    public void delete(ItemOption itemOption) {
        itemOptionRepository.delete(itemOption);
    }
}
