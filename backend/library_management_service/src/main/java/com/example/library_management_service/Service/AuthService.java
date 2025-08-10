package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.LoginRequest;
import com.example.library_management_service.DTO.RegisterRequest;
import com.example.library_management_service.DTO.UserRespone;
import com.example.library_management_service.Entity.Role;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.RoleRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public UserRespone login(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user);
            System.out.println(user.getRole());
            System.out.println(user.getRole().getRole_name());

            if (user.getPassword().equals(loginRequest.getPassword())) {
                return new UserRespone(user.getUsername(), user.getRole().getRole_name());

            }
        }
        return null; // Đăng nhập thất bại

    }

    @Autowired
    private RoleRepository roleRepository;
    public UserRespone register(RegisterRequest registerRequest) {
        Optional<User> existing = userRepository.findByUsername(registerRequest.getUsername());
        if (existing.isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        // Lấy role từ DB dựa theo roleId
        Role role = roleRepository.findById(registerRequest.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setRole(role);              // 👉 gán Role object
        user.setCreated_date(LocalDateTime.now());
        user.setIs_hide(false);
        userRepository.save(user);

        return new UserRespone(user.getUsername(), user.getRole().getRole_name());
    }
}