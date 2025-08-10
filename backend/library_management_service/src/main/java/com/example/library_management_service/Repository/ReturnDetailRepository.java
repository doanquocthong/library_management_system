package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Category;
import com.example.library_management_service.Entity.ReturnDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnDetailRepository extends JpaRepository<ReturnDetail, Long> {
}

