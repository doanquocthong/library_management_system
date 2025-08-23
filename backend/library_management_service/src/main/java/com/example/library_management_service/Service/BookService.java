package com.example.library_management_service.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.library_management_service.DTO.BookDTO;
import com.example.library_management_service.Entity.Book;
import com.example.library_management_service.Entity.Category;
import com.example.library_management_service.Repository.BookRepository;
import com.example.library_management_service.Repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final Cloudinary cloudinary;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    public BookService(Cloudinary cloudinary, BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.cloudinary = cloudinary;
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<BookDTO> getBooksByCategory(String categoryName) {
        List<Book> books = bookRepository.findByCategory_CategoryName(categoryName);
        return books.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .filter(book -> book.getQuantity() > 0) // bỏ sách ẩn
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Upload ảnh lên Cloudinary và trả về URL
    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
        return uploadResult.get("secure_url").toString();
    }
    public BookDTO createBook(BookDTO bookDTO, MultipartFile imageFile) throws IOException {
        Book book = new Book();
        book.setBookName(bookDTO.getBookName());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setPrice(Long.parseLong(bookDTO.getPrice()));
        book.setIsPopular(bookDTO.getIsPopular());
        book.setIsHide(false);
        book.setQuantity(bookDTO.getQuantity());

        // ✅ tìm Category theo tên
        String categoryName = bookDTO.getCategoryName();
        Category category = categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new RuntimeException("Category not found: " + categoryName));
        book.setCategory(category);

        // ✅ upload ảnh
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = uploadImage(imageFile);
            book.setBookImage(imageUrl);
        }

        // ✅ lưu book
        Book savedBook = bookRepository.save(book);

        // ✅ convert sang DTO
        BookDTO resultDTO = convertToDTO(savedBook);
        resultDTO.setCategoryName(category.getCategoryName()); // gán lại cho chắc
        return resultDTO;
    }






    // Ẩn sách
    public boolean hideBook(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setIsHide(true);
            bookRepository.save(book);
            return true;
        }
        return false;
    }

    // Hiện sách
    public boolean showBook(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setIsHide(false);
            bookRepository.save(book);
            return true;
        }
        return false;
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
        dto.setIsHide(book.getIsHide());
        if (book.getCategory() != null) {
            dto.setCategoryId(book.getCategory().getId());
            dto.setCategoryName(book.getCategory().getCategoryName());
        }
        return dto;
    }
}
