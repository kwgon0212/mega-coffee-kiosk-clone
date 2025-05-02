package com.megacoffee.kiosk.auth.application.port.in;

import com.megacoffee.kiosk.auth.application.dto.LoginCommand;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;

public interface LoginMember {
    /**
     * 사용자 로그인 처리, 액세스/리프레시 토큰 페어 반환
     */
    TokenPair exec(LoginCommand cmd);

}
