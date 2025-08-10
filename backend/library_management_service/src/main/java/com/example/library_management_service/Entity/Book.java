package com.example.library_management_service.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "book_image")
    private String bookImage;
    private String bookName;
    private String description;
    private Long price;
    private String author;
    private Integer quantity;
    private Boolean isPopular;
    private Boolean isHide;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private Set<BorrowDetail> borrowDetails = new HashSet<>();

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private Set<ReturnDetail> returnDetails = new HashSet<>();

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private Set<Review> reviews = new HashSet<>();
}
