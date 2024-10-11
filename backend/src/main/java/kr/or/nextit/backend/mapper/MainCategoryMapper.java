package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.MainCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainCategoryMapper {
    List<MainCategory> selectTopCategories();  // 최상위 카테고리 조회

    List<MainCategory> selectSubCategories(int parentId);  // 특정 카테고리의 하위 카테고리 조회

    // 카테고리와 부모 카테고리 조회
    MainCategory selectCategoryWithParent(String urlName);
}