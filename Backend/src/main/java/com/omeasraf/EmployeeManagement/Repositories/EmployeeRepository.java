package com.omeasraf.EmployeeManagement.Repositories;

import com.omeasraf.EmployeeManagement.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface EmployeeRepository  extends JpaRepository<Employee, Long> {
    @Transactional
    void deleteEmployeeById(Long id);
    @Transactional
    Optional<Employee> findEmployeeById(Long id);
}
