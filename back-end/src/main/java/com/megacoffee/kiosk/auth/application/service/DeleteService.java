package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.port.in.DeleteMember;
import com.megacoffee.kiosk.auth.application.port.out.DeletePort;
import com.megacoffee.kiosk.auth.domain.service.AuthService;
import com.megacoffee.kiosk.member.application.port.out.DeleteMemberPort;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
@RequiredArgsConstructor
public class DeleteService implements DeleteMember {
    private final MemberRepository memberRepository;
    private final DeletePort deletePort;
    private final DeleteMemberPort deleteMemberPort;

    @Override
    public boolean delete(UUID memberId) {
        deleteMemberPort.deleteById(memberId);
        return deletePort.delete(memberId);
    }

}
