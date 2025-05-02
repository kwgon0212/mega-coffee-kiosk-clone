package com.megacoffee.kiosk.member.application.port.out;

import java.util.UUID;

public interface DeleteMemberPort {
    void deleteById(UUID memberId);
}