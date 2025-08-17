package com.example.library_management_service.DTO;

import lombok.Data;


@Data
public class BorrowDetailDTO {
    private Long id;
    private Long userId;
    private Long bookId;
}
