package com.megacoffee.kiosk.auth.adapter.outbound.persistence;

import com.megacoffee.kiosk.auth.domain.model.AuthCredential;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.member.domain.Role;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(
        name = "auth",
        uniqueConstraints = {@UniqueConstraint(
                        name = "uk_auth_account_provider",
                        columnNames = { "account", "provider" }
                )
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AuthEntity {
    @Id
    @Column(name = "member_id", nullable = false)
    private UUID memberId;

    @Column(name = "account", nullable = false)
    private String account;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private OauthProvider provider;


    /**
     * 엔티티 -> 도메인 변환
     */
    public AuthCredential toDomain() {
        return AuthCredential.of(memberId, account, passwordHash, role, provider);
    }

    /**
     * 도메인 -> 엔티티 변환
     */
    public static AuthEntity fromDomain(AuthCredential credential) {
        return AuthEntity.builder()
                .memberId(credential.getMemberId())
                .account(credential.getAccount())
                .passwordHash(credential.getPasswordHash())
                .role(credential.getRole())
                .provider(credential.getProvider())
                .build();
    }
}
