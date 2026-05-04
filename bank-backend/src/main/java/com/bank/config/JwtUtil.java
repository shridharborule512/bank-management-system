package com.bank.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "bank_app_shridhar_secret_key_2026_secure";
    private final long EXPIRY  = 86400000; // 24 hours

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ── Generate Token ──
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRY))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ── Get Email from Token ──
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ── Validate Token ──
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

	// ── Get Role from Token ──
public String getRoleFromToken(String token) {
    return (String) Jwts.parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("role");
}
}