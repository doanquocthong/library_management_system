package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.BorrowDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowDetailRepository extends JpaRepository<BorrowDetail, Long> {
    List<BorrowDetail> findByUserId(Long userId);
}