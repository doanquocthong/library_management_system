package com.example.library_management_service.Controller;
import com.example.library_management_service.DTO.SupportDTO;
import com.example.library_management_service.Service.SupportService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/api/supports")
public class SupportController {

    @Autowired
    private SupportService supportService;

    @GetMapping
    public List<SupportDTO> getAllSupports() {
        return supportService.getAllSupports();
    }

    @GetMapping("/{id}")
    public SupportDTO getSupportById(@PathVariable Long id) {
        return supportService.getSupportById(id);
    }

    @PostMapping
    public SupportDTO createSupport(@RequestBody SupportDTO dto) {
        return supportService.createSupport(dto);
    }

    @PutMapping("/{id}")
    public SupportDTO updateSupport(@PathVariable Long id, @RequestBody SupportDTO dto) {
        return supportService.updateSupport(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSupport(@PathVariable Long id) {
        supportService.deleteSupport(id);
    }

    @PutMapping("/{id}/approve")
    public SupportDTO approveSupport(@PathVariable Long id) {
        return supportService.approveSupport(id);
    }

}
