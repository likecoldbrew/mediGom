package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.CategoryMapper;
import kr.or.nextit.backend.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    // 최상위 카테고리 가져오기
    public List<Category> getAllCategories() {
        List<Category> topCategories = categoryMapper.selectTopCategories();
        for (Category category : topCategories) {
            // 각 카테고리의 하위 카테고리도 조회하여 추가
            List<Category> subCategories = categoryMapper.selectSubCategories(category.getCategoryId());
            category.setSubcategories(subCategories);  // subcategories 필드를 모델에 추가 필요
        }
        return topCategories;
    }
}
