package com.megacoffee.kiosk.auth.application.port.in;

import java.util.UUID;

public interface DeleteMember {
    void exec(UUID memberId);
}
