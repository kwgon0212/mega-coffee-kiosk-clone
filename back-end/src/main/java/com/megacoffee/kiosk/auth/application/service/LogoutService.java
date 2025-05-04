package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.port.in.LogoutMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutMember {
    @Override
    public void logout(UUID memberId) {

    }
}
