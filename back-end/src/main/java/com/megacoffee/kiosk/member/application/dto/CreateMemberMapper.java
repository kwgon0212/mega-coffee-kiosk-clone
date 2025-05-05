package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.domain.Member;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class CreateMemberMapper {

    public Member toDomain(CreateMemberCommand cmd) {
        return new Member(
                cmd.getMemberId(),
                cmd.getName(),
                cmd.getNickName(),
                cmd.getGender(),
                cmd.getPhoneNumber(),
                cmd.getBirth()
        );
    }
}