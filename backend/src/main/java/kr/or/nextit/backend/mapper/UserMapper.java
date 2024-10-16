package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.User;
<<<<<<< HEAD
import org.apache.ibatis.annotations.Param;

=======
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

>>>>>>> main
@Mapper
public interface UserMapper {

    List<User> getAllUsers();
    List<User> getPatientList();
    List<User> getDoctorList();
    List<User> getAdminList();

<<<<<<< HEAD
    // 환자 목록 조회
    List<User> getPatientList();

    // 의사 목록 조회
    List<User> getDoctorList();

    // 관리자 목록 조회
    List<User> getAdminList();

    // 특정 유저 조회
    User getUserById(int userNo);
=======
    User getUserByNo(int userNo);
    User getUserById(String userId);
>>>>>>> main

    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int userNo);

    List<User> getDoctorsName();

    boolean checkIdExists(@Param("userId") String userId);
}
