package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);
}
