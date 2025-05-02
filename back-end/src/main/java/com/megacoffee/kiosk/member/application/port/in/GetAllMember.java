package com.megacoffee.kiosk.member.application.port.in;

import com.megacoffee.kiosk.member.domain.Member;

import java.util.List;

public interface GetAllMember {
    List<Member> exec();
}
