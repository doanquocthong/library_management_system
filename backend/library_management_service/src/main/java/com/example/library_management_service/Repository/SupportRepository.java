package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Role;
import com.example.library_management_service.Entity.Support;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Long> {
}

