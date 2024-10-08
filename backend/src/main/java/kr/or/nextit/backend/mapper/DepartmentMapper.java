package kr.or.nextit.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import kr.or.nextit.backend.model.Department;  // Department 클래스 임포트

@Mapper
public interface DepartmentMapper {
    List<Department> getDepartments();
}