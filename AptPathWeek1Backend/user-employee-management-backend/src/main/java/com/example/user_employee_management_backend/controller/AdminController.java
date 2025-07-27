package com.example.user_employee_management_backend.controller;

import com.example.user_employee_management_backend.dto.UserCreateRequest;
import com.example.user_employee_management_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody UserCreateRequest userCreateRequest) {
        try {
            userService.createUser(userCreateRequest);
            return ResponseEntity.ok("User created successfully with role: " + userCreateRequest.role());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}