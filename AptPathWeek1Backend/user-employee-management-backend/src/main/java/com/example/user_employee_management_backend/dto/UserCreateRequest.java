package com.example.user_employee_management_backend.dto;

import com.example.user_employee_management_backend.model.Role;

public record UserCreateRequest(String username, String password, Role role) {
}