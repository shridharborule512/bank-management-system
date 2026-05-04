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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // ── Fully Public ──
                .requestMatchers("/api/user/login").permitAll()
                .requestMatchers("/api/user/register").permitAll()

                // ── Admin Only ──
                .requestMatchers("/api/user/all").hasRole("ADMIN")
                .requestMatchers("/api/user/delete/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,
                    "/api/account/delete/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,
                    "/api/account/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,
                    "/api/account/create-all").hasRole("ADMIN")

                // ── Logged In Users ──
                .requestMatchers("/api/account/**").hasAnyRole("ADMIN","USER")
                .requestMatchers("/api/transaction/**").hasAnyRole("ADMIN","USER")
                .requestMatchers("/api/user/**").hasAnyRole("ADMIN","USER")

                // ── Everything else needs auth ──
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ── CORS config inside Security (replaces @CrossOrigin) ──
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:5173"
        ));
        config.setAllowedMethods(Arrays.asList(
            "GET","POST","PUT","DELETE","OPTIONS"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}