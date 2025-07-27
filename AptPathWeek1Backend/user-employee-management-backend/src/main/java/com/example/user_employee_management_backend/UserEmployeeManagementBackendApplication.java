package com.example.user_employee_management_backend;

import com.example.user_employee_management_backend.model.Role;
import com.example.user_employee_management_backend.model.User;
import com.example.user_employee_management_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * The main entry point for the Spring Boot application.
 */
@SpringBootApplication
public class UserEmployeeManagementBackendApplication {

	/**
	 * The main method which is the entry point of the Java application.
	 * It delegates to Spring Boot's SpringApplication class to launch the application.
	 * @param args Command line arguments passed to the application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(UserEmployeeManagementBackendApplication.class, args);
	}

	/**
	 * This method defines a CommandLineRunner bean, which is a special type of bean
	 * that gets executed once the Spring application context has been loaded.
	 *
	 * We use it here to initialize the database with a default admin user
	 * if one does not already exist. This ensures that there is always an
	 * admin account to log in with on the first run.
	 *
	 * @param userRepository  The repository for accessing user data.
	 * @param passwordEncoder The service for encoding passwords.
	 * @return A CommandLineRunner instance that will be executed on startup.
	 */
	@Bean
	CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			// Check if a user with the username "admin" already exists.
			// .isPresent() returns true if the Optional object contains a value.
			if (!userRepository.findByUsername("admin").isPresent()) {

				// If no admin user exists, create a new one.
				User admin = new User();
				admin.setUsername("admin");

				// IMPORTANT: The password "password" is encoded before being saved.
				// Never store plain text passwords in the database.
				admin.setPassword(passwordEncoder.encode("password"));

				admin.setRole(Role.ROLE_ADMIN);

				// The admin user does not need to reset their password on first login.
				admin.setFirstTimeLogin(false);

				// Save the new admin user to the database.
				userRepository.save(admin);


				System.out.println(">>> Default admin user created. Username: admin, Password: password");
			}
		};
	}
}