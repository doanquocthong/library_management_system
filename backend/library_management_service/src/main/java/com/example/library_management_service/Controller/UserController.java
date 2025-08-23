package com.example.library_management_service.Controller;

import com.example.library_management_service.DTO.UserDTO;
import com.example.library_management_service.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
//        try {
//            boolean deleted = userService.deleteUserById(id);
//            if (!deleted) {
//                return ResponseEntity.notFound().build(); // 404
//            }
//            return ResponseEntity.noContent().build(); // 204
//        } catch (IllegalStateException e) {
//            return ResponseEntity.badRequest().body(e.getMessage()); // 400 + message
//        }
//    }

    // Ẩn user
    @PutMapping("/{id}/hide")
    public ResponseEntity<String> hideUser(@PathVariable Long id) {
        boolean result = userService.hideUserById(id);
        if (result) {
            return ResponseEntity.ok("User " + id + " đã bị ẩn.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Hiện lại user
    @PutMapping("/{id}/unhide")
    public ResponseEntity<String> unhideUser(@PathVariable Long id) {
        boolean result = userService.unhideUserById(id);
        if (result) {
            return ResponseEntity.ok("User " + id + " đã được hiển thị lại.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
