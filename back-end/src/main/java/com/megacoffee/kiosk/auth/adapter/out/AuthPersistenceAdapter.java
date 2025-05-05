package com.megacoffee.kiosk.auth.adapter.out;

import com.megacoffee.kiosk.auth.application.port.out.DeletePort;
import com.megacoffee.kiosk.auth.application.port.out.LoadPort;
import com.megacoffee.kiosk.auth.application.port.out.SavePort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthPersistenceAdapter implements SavePort, LoadPort, DeletePort {
    private final AuthJpaRepository repository;
    private final MemberRepository memberRepository;

    @Override
    public AuthCredentials save(AuthCredentials credential) {
        AuthEntity entity = repository.save(AuthEntity.fromDomain(credential));

        return entity.toDomain();
    }

    @Override
    public boolean delete(UUID memberId) {
        if (repository.existsById(memberId)) {
            repository.deleteById(memberId);
            return true;
        } else {
            return false;
        }
    }


    @Override
    public AuthCredentials getByAccount(String account) {
        AuthEntity entity = repository.findByAccount(account).orElse(null);
        if (entity == null) {
            return null;
        }
        return entity.toDomain();
    }
}
