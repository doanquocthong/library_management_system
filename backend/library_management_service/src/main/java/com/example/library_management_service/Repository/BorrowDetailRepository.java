package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.BorrowDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowDetailRepository extends JpaRepository<BorrowDetail, Long> {
}