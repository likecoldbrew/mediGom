package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.UserMapper;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
=======
import org.springframework.security.crypto.password.PasswordEncoder;
>>>>>>> main
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

<<<<<<< HEAD
=======
    public void insertUser(User user) {
        user.setUserPass(passwordEncoder.encode(user.getUserPass())); // 비밀번호 암호화
        userRepository.save(user);
    }

    public void updateUser(User user) {
        // 비밀번호가 있을 경우에만 암호화
        if (user.getUserPass() != null && !user.getUserPass().isEmpty()) {
            user.setUserPass(passwordEncoder.encode(user.getUserPass()));
        }
        userRepository.save(user);
    }
>>>>>>> main
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
<<<<<<< HEAD
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
=======
    public User getUserByNo(int userNo) {
        return userMapper.getUserByNo(userNo);
    }

    public User getUserById(String userId) {
        return userMapper.getUserById(userId);
    }

>>>>>>> main

    // 유저 삭제
    public void deleteUser(int userNo) {
        userMapper.deleteUser(userNo);
    }

    public boolean checkIdExists(String userId) { userMapper.checkIdExists(userId);
        return userMapper.checkIdExists(userId); }


}
