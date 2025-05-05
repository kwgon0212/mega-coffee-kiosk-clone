package com.megacoffee.kiosk.auth.adapter.in.dto;

import lombok.Data;

@Data
public class RequestLogin {
    private String account;
    private String password;
}
