package com.example.library_management_service.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "supports")
public class Support {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String title;
    private String content;
    private LocalDate createdDate;
    private Boolean isApprove;
    @ManyToOne
    @JoinColumn(name = "user_id") // cột FK trong bảng supports
    @JsonBackReference
    private User user;
}
