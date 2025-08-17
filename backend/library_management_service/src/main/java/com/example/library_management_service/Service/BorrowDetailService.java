package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.BookDTO;
import com.example.library_management_service.DTO.BorrowDetailDTO;
import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.BorrowDetail;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.BookRepository;
import com.example.library_management_service.Repository.BorrowDetailRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowDetailService {
    @Autowired
    private BorrowDetailRepository borrowDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public BorrowDetailDTO createBorrowDetail(BorrowDetailDTO borrowDetailDTO) {
        BorrowDetail borrowDetail = new BorrowDetail();

        if (borrowDetailDTO.getUserId() != null) {
            User user = userRepository.findById(borrowDetailDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            borrowDetail.setUser(user);
        }

        if (borrowDetailDTO.getBookId() != null) {
            Book book = bookRepository.findById(borrowDetailDTO.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));
            borrowDetail.setBook(book);
        }

        BorrowDetail saved = borrowDetailRepository.save(borrowDetail);
        return convertToDTO(saved);
    }

    public boolean deleteBorrowDetail(Long id) {
        if (!borrowDetailRepository.existsById(id)) {
            return false; // Không tìm thấy để xóa
        }
        borrowDetailRepository.deleteById(id);
        return true; // Xóa thành công
    }

    private BorrowDetailDTO convertToDTO(BorrowDetail borrowDetail) {
        BorrowDetailDTO dto = new BorrowDetailDTO();
        dto.setId(borrowDetail.getId());
        dto.setUserId(
                borrowDetail.getUser() != null ? borrowDetail.getUser().getId() : null
        );
        dto.setBookId(
                borrowDetail.getBook() != null ? borrowDetail.getBook().getId() : null
        );
        return dto;
    }

}
