package com.megacoffee.kiosk.auth.domain.model;

import com.megacoffee.kiosk.member.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthCredentials {
    UUID memberId;
    String account;
    String passwordHash;
    Role role;

    public static AuthCredentials of(UUID memberId, String account, String passwordHash, Role role) {
        return new AuthCredentials(memberId, account, passwordHash, role);
    }
}
