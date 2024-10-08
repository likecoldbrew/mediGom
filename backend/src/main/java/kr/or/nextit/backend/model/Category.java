package kr.or.nextit.backend.model;

import lombok.Data;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "categories_admin")  // 테이블 이름을 명시
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY 전략 사용
    private int categoryId;
    private String name;
    private Integer parentId; // 부모 카테고리 ID
    private String userYN;
    private int categoryOrder;

    // 하위 카테고리 저장 필드
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentCategory")
    private List<Category> subcategories;

    // 부모 카테고리와의 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId", insertable = false, updatable = false) // 부모 ID와 연결
    private Category parentCategory;
}
