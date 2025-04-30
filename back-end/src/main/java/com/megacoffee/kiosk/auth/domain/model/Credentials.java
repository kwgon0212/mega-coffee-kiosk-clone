package com.megacoffee.kiosk.auth.domain.model;

import lombok.Getter;
import org.springdoc.core.providers.SecurityOAuth2Provider;

@Getter
public class Credentials {
    private final String account;
    private final String secret;
    private final SecurityOAuth2Provider provider;

    public Credentials(String account, String secret, SecurityOAuth2Provider provider){
        this.account=account;
        this.secret=secret;
        this.provider=provider;
    }
}
