package com.megacoffee.kiosk.auth.domain.model;

import com.megacoffee.kiosk.member.domain.Role;
import lombok.Getter;

import java.security.Provider;
import java.util.UUID;

@Getter
public class AuthCredential {
    private final UUID memberId;
    private final String account;
    private final String passwordHash;
    private final Role role;
    private final OauthProvider provider;

    private AuthCredential(UUID memberId, String account, String passwordHash, Role role, OauthProvider provider) {
        this.memberId = memberId;
        this.account = account;
        this.passwordHash = passwordHash;
        this.role = role;
        this.provider = provider;
    }

    public static AuthCredential of(UUID memberId, String account, String passwordHash, Role role, OauthProvider provider) {
        return new AuthCredential(memberId, account, passwordHash, role, provider);
    }
}