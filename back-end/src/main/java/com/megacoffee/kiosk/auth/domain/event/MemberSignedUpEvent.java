package com.megacoffee.kiosk.auth.domain.event;

import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class MemberSignedUpEvent {
    private final UUID memberId;
    private final Instant occurredAt;

    public MemberSignedUpEvent(UUID memberId) {
        this.memberId = memberId;
        this.occurredAt = Instant.now();
    }
}