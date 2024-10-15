package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.UserMapper;
import kr.or.nextit.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    // 목록 조회
    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public List<User> getPatientList() {
        return userMapper.getPatientList();
    }

    public List<User> getDoctorList() {
        return userMapper.getDoctorList();
    }

    public List<User> getAdminList() {
        return userMapper.getAdminList();
    }

    // 유저 한 명 조회
    public User getUserById(int userNo) {
        return userMapper.getUserById(userNo);
    }

    // 유저 등록
    public void insertUser(User user) {
        userMapper.insertUser(user);
    }

    // 유저 수정
    public void updateUser(User user) {
        userMapper.updateUser(user);
    }

    // 유저 삭제
    public void deleteUser(int userNo) {
        userMapper.deleteUser(userNo);
    }

    public boolean checkIdExists(String userId) { userMapper.checkIdExists(userId);
        return userMapper.checkIdExists(userId); }

}
