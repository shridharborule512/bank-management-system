package com.bank.service;

import com.bank.config.JwtUtil;
import com.bank.model.*;
import com.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ── Register ──
    public String registerUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered: " + user.getEmail());
        }
        // Set default role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    // ── Login ──
    public LoginResponse loginUser(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + loginRequest.getEmail());
        }

        User user = userOpt.get();

        // Check password (plain text for now)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new LoginResponse(
            token,
            user.getEmail(),
            user.getFullName(),
            user.getRole(),
            "Login successful!"
        );
    }

    // ── Get All Users ──
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ── Get User By ID ──
    public User getUserById(int id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // ── Delete User ──
    public String deleteUser(int id) {
        getUserById(id);
        userRepository.deleteById(id);
        return "User deleted successfully with id: " + id;
    }
}