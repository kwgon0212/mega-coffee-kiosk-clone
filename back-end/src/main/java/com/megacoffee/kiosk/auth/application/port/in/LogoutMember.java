package com.megacoffee.kiosk.auth.application.port.in;

import java.util.UUID;

public interface LogoutMember {
    void logout(UUID memberId);
}
