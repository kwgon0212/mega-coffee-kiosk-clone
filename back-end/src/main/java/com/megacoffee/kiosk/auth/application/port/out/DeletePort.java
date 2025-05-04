package com.megacoffee.kiosk.auth.application.port.out;

import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;

import java.util.UUID;

public interface DeletePort {
    boolean delete(UUID memberId);
}
