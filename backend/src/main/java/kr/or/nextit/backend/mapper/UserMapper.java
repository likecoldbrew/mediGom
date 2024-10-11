package kr.or.nextit.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.or.nextit.backend.model.User;
import org.apache.ibatis.annotations.Param;

import org.apache.ibatis.annotations.Param;


import org.apache.ibatis.annotations.Param;


@Mapper
public interface UserMapper {
    // 모든 유저 조회
    List<User> getAllUsers();

    // 특정 유저 조회
    User getUserById(int userNo);

    // 유저 추가
    void insertUser(User user);

    // 유저 수정
    void updateUser(User user);

    // 유저 삭제
    void deleteUser(int userNo);

    // 의사 이름 조회
    List<User> getDoctorsName();

    // ID 중복 확인 메서드
    boolean checkIdExists(@Param("userId") String userId);

}
