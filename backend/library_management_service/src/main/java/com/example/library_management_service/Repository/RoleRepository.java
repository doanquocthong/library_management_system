package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
