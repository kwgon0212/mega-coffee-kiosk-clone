package com.megacoffee.kiosk.auth.application.port.out;

import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;

public interface SavePort {
    AuthCredentials save(AuthCredentials ac);
}
