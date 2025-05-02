package com.megacoffee.kiosk.auth.application.port.in;


import com.megacoffee.kiosk.auth.application.dto.SignupCommand;
import com.megacoffee.kiosk.auth.domain.model.Credentials;

import java.util.UUID;

public interface SignupMember {
    UUID exec(SignupCommand cmd);
}
