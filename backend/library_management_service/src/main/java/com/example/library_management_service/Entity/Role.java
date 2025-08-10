package com.example.library_management_service.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "roles")
@ToString(exclude = {"users"})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role_name;
    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private Set<User> users = new HashSet<>();
}