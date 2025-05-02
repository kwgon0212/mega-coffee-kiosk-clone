package com.megacoffee.kiosk.auth.application.port.out;

import java.util.UUID;

public interface DeleteAuthPort {
    /**
     * 주어진 memberId의 인증 정보를 삭제합니다.
     */
    void deleteByMemberId(UUID memberId);
}