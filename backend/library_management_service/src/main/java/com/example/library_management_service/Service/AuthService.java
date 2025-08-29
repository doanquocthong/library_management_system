package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.LoginRequest;
import com.example.library_management_service.DTO.RegisterRequest;
import com.example.library_management_service.DTO.UserRespone;
import com.example.library_management_service.Entity.Role;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Entity.UserDetail;
import com.example.library_management_service.Repository.RoleRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserRespone login(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Nếu user bị block thì không cho login
            if (Boolean.TRUE.equals(user.getIsHide())) {
                throw new RuntimeException("Tài khoản đã bị khóa, vui lòng liên hệ admin!");
            }

            // Kiểm tra mật khẩu (hash)
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return new UserRespone(
                        user.getId(),
                        user.getUsername(),
                        user.getRole().getRole_name()
                );
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
        Role role = roleRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        User user = new User();
        user.setUsername(registerRequest.getUsername());
    // Lưu password đã mã hóa
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(role);              // 👉 gán Role object
        user.setCreated_date(LocalDateTime.now());
        user.setIsHide(false);

        UserDetail detail = new UserDetail();
        detail.setAddress(registerRequest.getAddress());
        detail.setEmail(registerRequest.getEmail());
        detail.setMssv(registerRequest.getMssv());
        detail.setFullname(registerRequest.getFullname());
        detail.setContact(registerRequest.getContact());
        detail.setUser(user);
        user.setUserDetail(detail);
        userRepository.save(user);

        return new UserRespone(user.getId(), user.getUsername(), user.getRole().getRole_name());
    }
}