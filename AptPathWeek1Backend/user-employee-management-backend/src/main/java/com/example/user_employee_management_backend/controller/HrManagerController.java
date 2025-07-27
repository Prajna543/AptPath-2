package com.example.user_employee_management_backend.controller;

import com.example.user_employee_management_backend.dto.EmployeeDto;
import com.example.user_employee_management_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hr-manager")
public class HrManagerController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/onboard-employee")
    public ResponseEntity<?> onboardEmployee(@RequestBody EmployeeDto employeeDto) {
        employeeService.onboardEmployee(employeeDto);
        return ResponseEntity.ok("Employee onboarded successfully!");
    }
}