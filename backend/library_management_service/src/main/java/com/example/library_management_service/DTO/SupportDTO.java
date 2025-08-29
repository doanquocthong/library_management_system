package com.example.library_management_service.DTO;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
public class SupportDTO {
    private Long id;
    private String fullName;
    private String email;
    private String title;
    private String content;
    private LocalDate createdDate;
    private Long userId;
    private Boolean isApprove;

}
