package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.UserDTO;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAllByIsHideFalse()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO (User user) {
        UserDTO dto = new UserDTO();
        dto.setUserName(user.getUsername());
        dto.setRole(user.getRole().getRole_name());
        dto.setMssv(user.getUserDetail().getMssv());
        dto.setFullName(user.getUserDetail().getFullname());
        dto.setAddress(user.getUserDetail().getAddress());
        dto.setContact(user.getUserDetail().getContact());
        dto.setCreatedDate(user.getCreated_date());
        return dto;
    }
}
