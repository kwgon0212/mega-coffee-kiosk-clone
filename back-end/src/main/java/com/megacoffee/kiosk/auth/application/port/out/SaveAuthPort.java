package com.megacoffee.kiosk.auth.application.port.out;

import com.megacoffee.kiosk.auth.domain.model.AuthCredential;

public interface SaveAuthPort {
    /**
     * 인증 정보 저장
     */
    AuthCredential save(AuthCredential credential);
}