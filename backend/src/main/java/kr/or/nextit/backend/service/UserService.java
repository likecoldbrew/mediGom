package kr.or.nextit.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import kr.or.nextit.backend.mapper.UserMapper;
import kr.or.nextit.backend.model.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public List<User> getAllPatient() {
        return userMapper.getAllPatient();
    }

    public User getUserById(int userNo) {
        return userMapper.getUserById(userNo);
    }


    public void insertUser(User user) {
        userMapper.insertUser(user);
    }

    public void updateUser(User user) {
        userMapper.updateUser(user);
    }

    public void deleteUser(int userNo) {
        userMapper.deleteUser(userNo);
    }

    public boolean checkIdExists(String userId) { userMapper.checkIdExists(userId);
        return userMapper.checkIdExists(userId); }

}
