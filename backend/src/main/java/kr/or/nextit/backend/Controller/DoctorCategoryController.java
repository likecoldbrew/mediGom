package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.DoctorCategory;
import kr.or.nextit.backend.service.DoctorCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class DoctorCategoryController {

    private final DoctorCategoryService doctorCategoryService;

    @GetMapping("/doctor")
    public ResponseEntity<List<DoctorCategory>> getAllCategories() {
        try {
            List<DoctorCategory> categories = doctorCategoryService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            // 오류 로그 추가
            System.err.println("Error fetching categories: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
