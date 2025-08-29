package com.example.library_management_service.Service;

import com.example.library_management_service.DTO.SupportDTO;
import com.example.library_management_service.Entity.Support;
import com.example.library_management_service.Entity.User;
import com.example.library_management_service.Repository.SupportRepository;
import com.example.library_management_service.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportService {

    @Autowired
    private SupportRepository supportRepository;

    @Autowired
    private UserRepository userRepository;

    // Convert Entity -> DTO
    private SupportDTO convertToDTO(Support support) {
        SupportDTO dto = new SupportDTO();
        dto.setId(support.getId());
        dto.setFullName(support.getFullName());
        dto.setEmail(support.getEmail());
        dto.setTitle(support.getTitle());
        dto.setContent(support.getContent());
        dto.setUserId(support.getUser() != null ? support.getUser().getId() : null);
        dto.setCreatedDate(support.getCreatedDate());
        dto.setIsApprove(support.getIsApprove());
        return dto;
    }

    // Convert DTO -> Entity
    private Support convertToEntity(SupportDTO dto) {
        Support support = new Support();
        support.setId(dto.getId());
        support.setFullName(dto.getFullName());
        support.setEmail(dto.getEmail());
        support.setTitle(dto.getTitle());
        support.setContent(dto.getContent());
        support.setCreatedDate(dto.getCreatedDate() != null ? dto.getCreatedDate() : LocalDate.now());
        support.setIsApprove(dto.getIsApprove() != null ? dto.getIsApprove() : false);

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));
            support.setUser(user);
        }

        return support;
    }

    public List<SupportDTO> getAllSupports() {
        return supportRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SupportDTO getSupportById(Long id) {
        return supportRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Support not found with id " + id));
    }

    public SupportDTO createSupport(SupportDTO dto) {
        Support support = convertToEntity(dto);
        // khi tạo mới mặc định chưa duyệt
        support.setIsApprove(false);
        Support saved = supportRepository.save(support);
        return convertToDTO(saved);
    }

    public SupportDTO updateSupport(Long id, SupportDTO dto) {
        Support existing = supportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found with id " + id));

        existing.setFullName(dto.getFullName());
        existing.setEmail(dto.getEmail());
        existing.setTitle(dto.getTitle());
        existing.setContent(dto.getContent());

        if (dto.getIsApprove() != null) {
            existing.setIsApprove(dto.getIsApprove());
        }

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));
            existing.setUser(user);
        }

        return convertToDTO(supportRepository.save(existing));
    }

    // Admin duyệt xử lý support
    public SupportDTO approveSupport(Long id) {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found with id " + id));
        support.setIsApprove(true);
        return convertToDTO(supportRepository.save(support));
    }

    public void deleteSupport(Long id) {
        supportRepository.deleteById(id);
    }
}
