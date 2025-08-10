package com.example.library_management_service.DTO;

import java.time.LocalDateTime;

public class ReviewDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private LocalDateTime reviewDate;
    private String comment;
}
