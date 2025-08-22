package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.UserDTO;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.BorrowDetailRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return userRepository.findAllByIsHideFalse()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        return convertToDTO(user);
    }
    public Boolean deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            return false;
        }
        if (borrowDetailRepository.existsById(id)) {
            throw new IllegalStateException("Không thể xóa user vì còn bản ghi mượn sách liên quan.");
        }
        userRepository.deleteById(id);
        return true;
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
        return dto;
    }
}
