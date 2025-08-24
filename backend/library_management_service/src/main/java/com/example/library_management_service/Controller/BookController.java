package com.example.library_management_service.Controller;

import com.example.library_management_service.DTO.BookDTO;
import com.example.library_management_service.Service.BookService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // GET all books
    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // GET book by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Lấy sách theo category
    @GetMapping("/category/{categoryName}")
    public List<BookDTO> getBooksByCategory(@PathVariable String categoryName) {
        return bookService.getBooksByCategory(categoryName);
    }

    // Ẩn sách
    @PutMapping("/{id}/hide")
    public ResponseEntity<String> hideBook(@PathVariable Long id) {
        boolean result = bookService.hideBook(id);
        return result ? ResponseEntity.ok("Book hidden successfully")
                : ResponseEntity.notFound().build();
    }

    // Hiện sách
    @PutMapping("/{id}/unhide")
    public ResponseEntity<String> unhideBook(@PathVariable Long id) {
        boolean result = bookService.showBook(id);
        return result ? ResponseEntity.ok("Book unhidden successfully")
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<BookDTO> createBook(
            @RequestPart("book") BookDTO bookDTO,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        BookDTO createdBook = bookService.createBook(bookDTO, imageFile);
        return ResponseEntity.ok(createdBook);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<BookDTO> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        return bookService.changeQuantity(id, quantity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}