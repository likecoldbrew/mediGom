package kr.or.nextit.backend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")  // 테이블 이름을 명시
@Data
public class Category {
    @Id
    @GeneratedValue
    private int categoryId;

    private String name;

    private Integer parentId;

    private int order;

    private String userYN;
    // 하위 카테고리 저장 필드
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentId")
    private List <Category> subcategories;
}
