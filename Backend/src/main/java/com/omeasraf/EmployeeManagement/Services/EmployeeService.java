package com.omeasraf.EmployeeManagement.Services;

import com.omeasraf.EmployeeManagement.Exceptions.UserNotFoundException;
import com.omeasraf.EmployeeManagement.Repositories.EmployeeRepository;
import com.omeasraf.EmployeeManagement.Models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeID(UUID.randomUUID().toString());
        return employeeRepository.save(employee);
    }

    public List<Employee> findAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee findEmployeeById(Long id){
        return employeeRepository.findEmployeeById(id).orElseThrow(() -> new UserNotFoundException("No user found with the provided Id"));
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteEmployeeById(id);
    }
}
