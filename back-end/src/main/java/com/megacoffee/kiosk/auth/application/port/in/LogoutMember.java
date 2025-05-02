package com.megacoffee.kiosk.auth.application.port.in;

import com.megacoffee.kiosk.auth.domain.model.AccessToken;

public interface LogoutMember {
    void exec(AccessToken accessToken);
}
