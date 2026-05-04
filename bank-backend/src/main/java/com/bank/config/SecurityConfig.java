package com.bank.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // ── Public endpoints ──
                .requestMatchers("/api/user/login").permitAll()
                .requestMatchers("/api/user/register").permitAll()

                // ── Admin only ──
                .requestMatchers("/api/user/all").hasRole("ADMIN")
                .requestMatchers("/api/user/delete/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,
                    "/api/account/delete/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,
                    "/api/account/create").hasRole("ADMIN")

                // ── Admin + User ──
                .requestMatchers("/api/account/all").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/api/account/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/api/transaction/**").hasAnyRole("ADMIN", "USER")

                // ── Everything else needs login ──
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}