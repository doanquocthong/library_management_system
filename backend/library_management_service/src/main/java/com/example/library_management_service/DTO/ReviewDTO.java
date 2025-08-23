package com.example.library_management_service.DTO;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ReviewDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private String userName;
    private String bookName;
    private LocalDateTime reviewDate;
    private String comment;
}
