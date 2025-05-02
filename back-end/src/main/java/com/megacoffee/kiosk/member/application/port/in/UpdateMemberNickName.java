package com.megacoffee.kiosk.member.application.port.in;

import java.util.UUID;

public interface UpdateMemberNickName {
    void exec(UUID memberId, String newNickName);
}