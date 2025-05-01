package com.megacoffee.kiosk.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openApi() {
        // 카카오용 OAuth2 플로우
        OAuthFlow kakaoFlow = new OAuthFlow()
                .authorizationUrl("https://kauth.kakao.com/oauth/authorize")
                .tokenUrl("https://kauth.kakao.com/oauth/token")
                .scopes(new Scopes().addString("profile_nickname", "사용자 프로필 정보 조회"));

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("OAuth2-Kakao", new SecurityScheme()
                                .type(SecurityScheme.Type.OAUTH2)
                                .flows(new OAuthFlows().authorizationCode(kakaoFlow))
                        )
                )
                // 이 SecurityScheme을 전역 요구사항으로 등록
                .addSecurityItem(new SecurityRequirement().addList("OAuth2-Kakao"));
    }
}
