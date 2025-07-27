package com.example.user_employee_management_backend.service;
import com.example.user_employee_management_backend.dto.EmployeeDto;
import com.example.user_employee_management_backend.model.Employee;
import com.example.user_employee_management_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee onboardEmployee(EmployeeDto employeeDto) {
        Employee newEmployee = new Employee();
        newEmployee.setName(employeeDto.name());
        newEmployee.setAge(employeeDto.age());
        newEmployee.setTotalExperience(employeeDto.totalExperience());
        newEmployee.setPastExperience(employeeDto.pastExperience());

        return employeeRepository.save(newEmployee);
    }
}
