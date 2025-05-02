package com.megacoffee.kiosk.member.adapter.outbound;

import com.megacoffee.kiosk.member.application.port.out.DeleteMemberPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MemberDeletionAdapter implements DeleteMemberPort {
    private final MemberJpaRepository memberJpaRepository;

    @Override
    public void deleteById(UUID memberId) {
        memberJpaRepository.deleteById(memberId);
    }
}