package com.example.library_management_service.Controller;

import com.example.library_management_service.DTO.ReviewDTO;
import com.example.library_management_service.Service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Lấy tất cả review
    @GetMapping
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Lấy review theo ID
    @GetMapping("/{bookId}")
    public List<ReviewDTO> getReviewById(@PathVariable Long bookId) {
        return reviewService.getReviewByBookId(bookId);
    }

    // Tạo review mới
    @PostMapping("/user/{userId}/book/{bookId}")
    public ReviewDTO createReview(@PathVariable Long userId,
                                  @PathVariable Long bookId,
                                  @RequestBody ReviewDTO reviewDTO) {
        return reviewService.createReview(userId, bookId, reviewDTO);
    }
//
//    // Xóa review
//    @DeleteMapping("/{id}")
//    public void deleteReview(@PathVariable Long id) {
//        reviewService.deleteReview(id);
//    }
}
