package com.example.library_management_service.DTO;

import lombok.Data;

@Data
public class BookDTO {
    private Long id;
    private String bookImage;
    private String bookName;
    private String author;
    private String description;
    private String price;
    private String categoryName;
    private Boolean isPopular;
}
