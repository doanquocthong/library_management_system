package com.example.library_management_service.DTO;

import com.example.library_management_service.Entity.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private String userName;
    private String role;
    private String mssv;
    private String fullName;
    private String address;
    private String contact;
    private LocalDateTime createdDate;
}
