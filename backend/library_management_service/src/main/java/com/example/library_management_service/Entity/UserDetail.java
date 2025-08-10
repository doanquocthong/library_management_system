package com.example.library_management_service.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_detail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mssv;
    private String address;
    private String fullname;
    private String contact;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}

