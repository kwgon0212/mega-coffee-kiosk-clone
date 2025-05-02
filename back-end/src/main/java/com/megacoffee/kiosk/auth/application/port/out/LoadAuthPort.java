package com.megacoffee.kiosk.auth.application.port.out;

import com.megacoffee.kiosk.auth.domain.model.AuthCredential;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;

import java.security.Provider;
import java.util.Optional;
import java.util.UUID;

/**
 * 인증 정보 조회 포트
 */
public interface LoadAuthPort {
    /**
     * account(아이디)로 저장된 인증 정보를 불러옵니다.
     */
    Optional<AuthCredential> findByAccount(String account);


    /**
     * memberId로 저장된 인증 정보를 불러옵니다.
     */
    Optional<AuthCredential> findByMemberId(UUID memberId);

    Optional<AuthCredential> findByAccountAndProvider(String account, OauthProvider provider);
}
