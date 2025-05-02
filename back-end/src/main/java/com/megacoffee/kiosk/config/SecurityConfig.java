package com.megacoffee.kiosk.config;

import com.megacoffee.kiosk.auth.application.service.CustomOAuth2UserService;
import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
import com.megacoffee.kiosk.auth.infrastructure.security.JwtAuthenticationFilter;
import com.megacoffee.kiosk.auth.infrastructure.security.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // Lombok 어노테이션: final 필드를 생성자로 주입
public class SecurityConfig {// 추가

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.builder()
                .username("admin")
                .password(encoder.encode("secret123"))
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            JwtProvider jwtProvider,
            @Qualifier("customOAuth2UserService")
            OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService,
            OAuth2LoginSuccessHandler successHandler
    ) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/webjars/**",
                                "/api/register",
                                "/api/auth/**",
                                "/oauth2/**"
                        ).permitAll()
                        // 기존 허용 경로
                        .requestMatchers("/api/register", "/auth/**", "/oauth2/**").permitAll()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(u -> u.userService(oauth2UserService))
                        .successHandler(successHandler)
                );
        return http.build();
    }

    @Bean
    public OAuth2LoginSuccessHandler successHandler(JwtProvider jwtProvider) {
        return new OAuth2LoginSuccessHandler(jwtProvider);
    }
}


