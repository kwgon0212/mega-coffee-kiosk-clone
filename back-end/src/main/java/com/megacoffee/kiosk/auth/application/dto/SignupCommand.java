// SignupCommand.java
package com.megacoffee.kiosk.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 회원가입 요청 정보를 담는 커맨드 객체
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignupCommand {
    private String name;
    private String account;
    private String password;
    private String phonenumber;
    private String nickName;
}
