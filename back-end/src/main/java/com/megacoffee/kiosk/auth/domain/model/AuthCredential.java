package com.megacoffee.kiosk.auth.domain.model;

import com.megacoffee.kiosk.member.domain.Role;
import lombok.Getter;

import java.util.UUID;

@Getter
public class AuthCredential {
    private final UUID memberId;
    private final String account;
    private final String passwordHash;
    private final Role role;

    private AuthCredential(UUID memberId, String account, String passwordHash, Role role) {
        this.memberId = memberId;
        this.account = account;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public static AuthCredential of(UUID memberId, String account, String passwordHash, Role role) {
        return new AuthCredential(memberId, account, passwordHash, role);
    }
}