package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.User;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> getAllUsers();
    List<User> getPatientList();
    List<User> getDoctorList();
    List<User> getAdminList();


    User getUserByNo(int userNo);
    User getUserById(String userId);

    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int userNo);

    List<User> getDoctorsName();

    boolean checkIdExists(@Param("userId") String userId);
}
