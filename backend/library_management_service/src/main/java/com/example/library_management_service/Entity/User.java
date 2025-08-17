package com.example.library_management_service.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@ToString(exclude = {"role", "userDetail", "borrowDetails", "returnDetails", "reviews"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "created_date")
    private LocalDateTime created_date;

    @Column(name = "is_hide")
    private Boolean isHide;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleid")
    @JsonBackReference
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserDetail userDetail;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<BorrowDetail> borrowDetails = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<ReturnDetail> returnDetails = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<Review> reviews = new HashSet<>();
}
