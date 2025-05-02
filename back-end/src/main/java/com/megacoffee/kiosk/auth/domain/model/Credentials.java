package com.megacoffee.kiosk.auth.domain.model;

import lombok.Getter;

@Getter
public class Credentials {
    private final String account;
    private final String secret;
    private final OauthProvider provider;

    public Credentials(String account, String secret, OauthProvider provider){
        this.account=account;
        this.secret=secret;
        this.provider=provider;
    }
}
