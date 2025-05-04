package com.megacoffee.kiosk.auth.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Credentials {
    String account;
    String secret;

    public static Credentials of(String account, String secret) {
        return new Credentials(account, secret);
    }

}
