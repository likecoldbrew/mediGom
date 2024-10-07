package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryrMapper {
    List<Category> selectTopCategories();  // 최상위 카테고리 조회

    List<Category> selectSubCategories(int parentId);  // 특정 카테고리의 하위 카테고리 조회
}

