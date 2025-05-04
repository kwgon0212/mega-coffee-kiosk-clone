package com.megacoffee.kiosk.config;

import com.megacoffee.kiosk.member.domain.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtUtil jwtUtil) throws Exception {
        return http
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth ->
                        auth
                                // Swagger 접근 가능
                                .requestMatchers(
                                        "/v3/api-docs/**",
                                        "/swagger-ui.html",
                                        "/swagger-ui/**"
                                ).permitAll()
                                // 누구나 가능
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/api/register").permitAll()
                                .requestMatchers( "/api/auth/google").permitAll()
                                .requestMatchers( "/api/auth/google/callback").permitAll()
                                .requestMatchers( "/api/auth/kakao").permitAll()
                                .requestMatchers( "/api/auth/kakao/callback").permitAll()
                                .requestMatchers( "/api/**").permitAll()
                                // 유저, 관리자 모두 가능
                                .requestMatchers( "/api/menu/**").hasAnyRole(Role.USER.name())
                                .requestMatchers("/api/order/**").hasAnyRole(Role.USER.name())
                                .requestMatchers("/api/store/**").hasAnyRole(Role.USER.name())
                                // 유저만 가능
//                                .requestMatchers(HttpMethod.POST, "/api/order").hasRole(Role.USER.name())
//                                .requestMatchers(HttpMethod.GET, "/api/order/code").hasRole(Role.USER.name())
                                // 관리자만 가능
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}