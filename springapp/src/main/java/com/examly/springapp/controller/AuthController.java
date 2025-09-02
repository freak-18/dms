package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        if (username == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "All fields are required"));
        }

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Username already exists"));
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already exists"));
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // In production, this should be hashed
        user.setRole(User.Role.DONOR);

        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("username", savedUser.getUsername());
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return performLogin(request, null);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> request) {
        return performLogin(request, User.Role.SYSTEM_ADMIN);
    }

    @PostMapping("/ngo/login")
    public ResponseEntity<?> ngoLogin(@RequestBody Map<String, String> request) {
        return performLogin(request, User.Role.NGO_ADMIN);
    }

    @PostMapping("/donor/login")
    public ResponseEntity<?> donorLogin(@RequestBody Map<String, String> request) {
        return performLogin(request, User.Role.DONOR);
    }

    private ResponseEntity<?> performLogin(Map<String, String> request, User.Role requiredRole) {
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }

        if (requiredRole != null && !user.getRole().equals(requiredRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Access denied for this role"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("token", "mock-jwt-token-" + user.getId());

        return ResponseEntity.ok(response);
    }
}