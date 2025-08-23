package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.UserDTO;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.BorrowDetailRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BorrowDetailRepository borrowDetailRepository;

    public UserService(UserRepository userRepository, BorrowDetailRepository borrowDetailRepository) {
        this.borrowDetailRepository = borrowDetailRepository;
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        return convertToDTO(user);
    }
    public boolean hideUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setIsHide(true);   // set flag
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);  // nếu không tìm thấy thì false
    }
    public boolean unhideUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setIsHide(false);  // bật lại user
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);  // không tìm thấy thì trả về false
    }

    private UserDTO convertToDTO (User user) {
        UserDTO dto = new UserDTO();
        dto.setUserName(user.getUsername());
        dto.setMssv(user.getUserDetail().getMssv());
        dto.setFullname(user.getUserDetail().getFullname());
        dto.setAddress(user.getUserDetail().getAddress());
        dto.setContact(user.getUserDetail().getContact());
        dto.setCreatedDate(user.getCreated_date());
        dto.setEmail(user.getUserDetail().getEmail());
        dto.setRoleName(user.getRole().getRole_name());
        dto.setUserId(user.getId());
        dto.setIsHide(user.getIsHide());
        return dto;
    }
}
