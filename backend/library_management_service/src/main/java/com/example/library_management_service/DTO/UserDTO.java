package com.example.library_management_service.DTO;

import com.example.library_management_service.Entity.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private String userName;
    private String mssv;
    private String fullname;
    private String address;
    private String contact;
    private LocalDateTime createdDate;
    private String email;
}
