package com.example.library_management_service.Controller;

import com.example.library_management_service.DTO.BorrowDetailDTO;
import com.example.library_management_service.Service.BorrowDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/borrow-details")
public class BorrowDetailController {
    @Autowired
    private BorrowDetailService borrowDetailService;

    @PostMapping
    public ResponseEntity<?> createBorrowDetail(@RequestBody BorrowDetailDTO borrowDetailDTO) {
        BorrowDetailDTO borrowDetail = borrowDetailService.createBorrowDetail(borrowDetailDTO);
        if (borrowDetail != null) {
            return ResponseEntity.ok(borrowDetail);
        } else {
            return ResponseEntity.badRequest().body("Failed to create BorrowDetail");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBorrowDetail(@PathVariable Long id) {
        boolean deleted = borrowDetailService.deleteBorrowDetail(id);
        if (deleted) {
            return ResponseEntity.ok("BorrowDetail with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("BorrowDetail not found");
        }
    }

}
