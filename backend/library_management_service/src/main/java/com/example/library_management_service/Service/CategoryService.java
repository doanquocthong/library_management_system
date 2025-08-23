package com.example.library_management_service.Service;

import com.example.library_management_service.Entity.Category;
import com.example.library_management_service.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // ✅ Lấy tất cả category và convert sang DTO
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}