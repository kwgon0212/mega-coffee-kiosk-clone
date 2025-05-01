package com.megacoffee.kiosk.auth.adapter.outbound.persistence;

import com.megacoffee.kiosk.auth.application.port.out.DeleteAuthPort;
import com.megacoffee.kiosk.auth.application.port.out.LoadAuthPort;
import com.megacoffee.kiosk.auth.application.port.out.SaveAuthPort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredential;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthPersistenceAdapter implements SaveAuthPort, LoadAuthPort, DeleteAuthPort {
    private final AuthJpaRepository repository;

    @Override
    public AuthCredential save(AuthCredential credential) {
        AuthEntity entity = repository.save(AuthEntity.fromDomain(credential));
        return entity.toDomain();
    }

    @Override
    public Optional<AuthCredential> findByAccount(String account) {
        return repository.findByAccount(account)
                .map(AuthEntity::toDomain);
    }

    @Override
    public Optional<AuthCredential> findByMemberId(UUID memberId) {
        return repository.findByMemberId(memberId)
                .map(AuthEntity::toDomain);
    }

    @Override
    public Optional<AuthCredential> findByAccountAndProvider(String account, OauthProvider provider) {
        // TODO: 향후 AuthEntity 에 provider 컬럼을 추가했다면, repository 에 findByAccountAndProvider 메서드를 정의하세요.
        return repository.findByAccountAndProvider(account,provider)
                .map(AuthEntity::toDomain);
    }

    @Override
    public void deleteByMemberId(UUID memberId) {
        repository.deleteById(memberId);
    }
}
