package com.example.user_employee_management_backend.repository; // CHECK THIS LINE!

import com.example.user_employee_management_backend.model.Employee; // CHECK THIS LINE!
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Employee entity.
 * By extending JpaRepository, we get a lot of standard database
 * operations for free (e.g., save, findById, findAll).
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // This interface is intentionally left empty.
    // Spring Data JPA will automatically implement the basic CRUD methods.
}