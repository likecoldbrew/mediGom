package kr.or.nextit.backend.Controller;

import kr.or.nextit.backend.model.MainCategory;
import kr.or.nextit.backend.service.MainCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class MainCategoryController {

    private final MainCategoryService mainCategoryService;

    @GetMapping("/main")
    public ResponseEntity<List<MainCategory>> getAllCategories() {
        try {
            List<MainCategory> categories = mainCategoryService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            // 오류 로그 추가
            System.err.println("Error fetching categories: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{urlName}")
    public MainCategory getCategory(@PathVariable String urlName) {
        return mainCategoryService.getCategoryWithParent(urlName);
    }




}
