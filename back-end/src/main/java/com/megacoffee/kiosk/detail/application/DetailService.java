package com.megacoffee.kiosk.detail.application;

import com.megacoffee.kiosk.detail.domain.Detail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DetailService {
    private final DetailRepository detailRepository;

    @Transactional
    public Detail save(Detail detail) {
        return detailRepository.save(detail);
    }

    @Transactional
    public void delete(Detail detail) {
        detailRepository.delete(detail);
    }
}
