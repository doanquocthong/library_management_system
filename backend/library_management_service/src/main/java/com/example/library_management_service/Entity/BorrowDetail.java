package com.example.library_management_service.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "borrow_detail")
public class BorrowDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonBackReference
    private Book book;

    public enum BorrowStatus {
        PENDING, //Chờ phê duyệt
        BORROWED, //Đã phê duyệt, đang mượn
        RETURNED, //Đã trả
        CANCELLED // Hủy
    }
    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "status")
    private BorrowStatus status = BorrowStatus.PENDING;

    private LocalDateTime date_borrow_book = LocalDateTime.now();
    private LocalDateTime date_return_book = null;

    @JoinColumn(name = "full_name")
    private String fullName;
    @JoinColumn(name = "contact")
    private Long contact;
    @JoinColumn(name = "address")
    private String address;
    @JoinColumn(name = "email")
    private String email;
}
