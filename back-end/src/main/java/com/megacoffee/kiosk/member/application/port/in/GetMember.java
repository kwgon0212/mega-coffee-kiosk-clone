package com.megacoffee.kiosk.member.application.port.in;

import com.megacoffee.kiosk.member.domain.Member;

import java.util.UUID;

public interface GetMember {
    Member exec(UUID memberId);
}
