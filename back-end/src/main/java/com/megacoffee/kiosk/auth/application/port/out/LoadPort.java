package com.megacoffee.kiosk.auth.application.port.out;

import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.auth.domain.model.Credentials;

import java.util.UUID;

public interface LoadPort {
    AuthCredentials getByAccount(String account);
}
