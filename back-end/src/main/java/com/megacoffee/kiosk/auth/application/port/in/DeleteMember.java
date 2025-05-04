package com.megacoffee.kiosk.auth.application.port.in;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

public interface DeleteMember{
    boolean delete(UUID memberId);
}
