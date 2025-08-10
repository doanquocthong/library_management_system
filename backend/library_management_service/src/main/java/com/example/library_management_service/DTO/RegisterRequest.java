package com.example.library_management_service.DTO;


import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private Long roleId;
}
