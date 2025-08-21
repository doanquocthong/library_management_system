package com.example.library_management_service.DTO;

import lombok.Data;


@Data
public class BorrowDetailDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private String fullName;
    private Long contact;
    private String address;
    private String email;
}
