package com.example.user_employee_management_backend.service;

import com.example.user_employee_management_backend.dto.UserCreateRequest;
import com.example.user_employee_management_backend.model.User;
import com.example.user_employee_management_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for user-related operations, like user creation.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Creates a new user (HR or Manager). This method is intended to be called by an Admin.
     *
     * @param request The DTO containing the details for the new user.
     * @return The saved User object.
     * @throws IllegalArgumentException if the username already exists.
     */
    public User createUser(UserCreateRequest request) {
        // First, check if a user with the given username already exists to avoid duplicates.
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Error: Username is already taken!");
        }

        // Create a new User entity.
        User newUser = new User();
        newUser.setUsername(request.username());

        // Always encode the password before storing it.
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setRole(request.role());

        // Newly created users must reset their password on their first login.
        newUser.setFirstTimeLogin(true);

        // Save the new user to the database.
        return userRepository.save(newUser);
    }
}