package com.example.library_management_service.DTO;


import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String fullname;
    private String contact;
    private String address;
    private String email;
    private String mssv = null;
//    private Long roleId;
}
