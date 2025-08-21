package com.example.library_management_service.Repository;

import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory_CategoryName(String categoryName);
}
