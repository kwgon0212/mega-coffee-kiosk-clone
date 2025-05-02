// LoginCommand.java
package com.megacoffee.kiosk.auth.application.dto;

import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 로그인 요청 정보를 담는 커맨드 객체
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginCommand {
    private String account;
    private String password;
    private OauthProvider provider;
}
