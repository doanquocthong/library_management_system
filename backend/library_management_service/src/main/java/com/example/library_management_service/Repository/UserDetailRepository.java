package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
}