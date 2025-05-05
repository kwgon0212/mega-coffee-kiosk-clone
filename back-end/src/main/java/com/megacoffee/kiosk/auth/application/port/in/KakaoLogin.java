package com.megacoffee.kiosk.auth.application.port.in;

import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;

public interface KakaoLogin {
    ResponseLogin login(OAuthLoginDto oAuthLoginDto);
}
