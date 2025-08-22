package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.BookDTO;
import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.Category;
import com.example.library_management_service.Repository.BookRepository;
import com.example.library_management_service.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Lấy danh sách sách theo tên category
    public List<BookDTO> getBooksByCategory(String categoryName) {
        List<Book> books = bookRepository.findByCategory_CategoryName(categoryName);
        return books.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy tất cả sách
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy sách theo ID
    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id)
                .map(this::convertToDTO);
    }
    // Thêm sách mới
    public BookDTO createBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setBookName(bookDTO.getBookName());
        book.setBookImage(bookDTO.getBookImage());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setPrice(Long.parseLong(bookDTO.getPrice()));
        book.setIsPopular(bookDTO.getIsPopular());
        book.setIsHide(false); // mặc định là hiển thị
        book.setQuantity(0);   // nếu chưa có thông tin số lượng

        // Set category nếu có
//        if (bookDTO.getCategoryName() != null) {
//            // Ở đây cần CategoryRepository để tìm Category theo tên
//            // Ví dụ:
//            Category category = categoryRepository.findByCategoryName(bookDTO.getCategoryName())
//                    .orElseThrow(() -> new RuntimeException("Category not found"));
//            book.setCategory(category);
//        }

        Book savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);
    }
    // Chuyển Entity → DTO
    private BookDTO convertToDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setBookName(book.getBookName());
        dto.setBookImage(book.getBookImage());
        dto.setAuthor(book.getAuthor());
        dto.setDescription(book.getDescription());
        dto.setPrice(String.valueOf(book.getPrice()));
        dto.setIsPopular(book.getIsPopular());
        dto.setQuantity(book.getQuantity());
        // Lấy categoryName từ entity category
        if (book.getCategory() != null) {
            dto.setCategoryName(book.getCategory().getCategoryName());
        }
        return dto;
    }

}