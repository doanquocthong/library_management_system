package com.example.library_management_service.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BorrowDetailResponseDTO {
//    private Long id;

//    private Long userId;
    private String userName;
    private String userEmail;
    private String userAddress;

//    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookImage;
    private String status;
    private LocalDateTime dateBorrowBook;
    private LocalDateTime dateReturnBook;

    private String fullName;
    private Long contact;
    private String address;
    private String email;
}

