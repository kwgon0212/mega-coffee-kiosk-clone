package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.port.in.DeleteMember;
import com.megacoffee.kiosk.auth.domain.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteMemberService implements DeleteMember {
    private final AuthenticationService authenticationService;

    @Override
    public void exec(UUID memberId) {
        authenticationService.deleteMember(memberId);
    }
}