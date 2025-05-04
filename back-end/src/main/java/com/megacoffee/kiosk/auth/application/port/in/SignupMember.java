package com.megacoffee.kiosk.auth.application.port.in;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.domain.model.Credentials;

import java.util.UUID;

public interface SignupMember {
    UUID signup(RegisterRequest registerRequest);
}
