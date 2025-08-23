package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.ReviewDTO;
import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.Review;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.BookRepository;
import com.example.library_management_service.Repository.ReviewRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         UserRepository userRepository,
                         BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    // Lấy tất cả review
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Lấy tất cả review theo BookId
    public List<ReviewDTO> getReviewByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Tạo review mới
    public ReviewDTO createReview(Long userId, Long bookId, ReviewDTO reviewDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book không tồn tại"));

        Review review = new Review();
        review.setComment(reviewDTO.getComment());
        review.setReviewDate(LocalDateTime.now());
        review.setUser(user);
        review.setBook(book);

        Review saved = reviewRepository.save(review);
        return convertToDTO(saved);
    }

    // Xóa review
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
    

    // Convert Entity -> DTO
    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setUserName(review.getUser() != null ? review.getUser().getUsername() : null);
        dto.setBookName(review.getBook() != null ? review.getBook().getBookName() : null);
        dto.setReviewDate(review.getReviewDate());
        dto.setComment(review.getComment());
        dto.setUserId(review.getId());
        dto.setBookId(review.getId());
        return dto;
    }
}
