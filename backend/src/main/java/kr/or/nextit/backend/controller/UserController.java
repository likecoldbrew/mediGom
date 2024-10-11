package kr.or.nextit.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 사용자(환자) 목록
    @GetMapping("/patient")
    public List<User> getPatientList() {
        return userService.getPatientList();
    }

    // 의사(직원) 목록
    @GetMapping("/doctor")
    public List<User> getDoctorList() {
        return userService.getDoctorList();
    }

    // 관리자 목록
    @GetMapping("/admin")
    public List<User> getAdminList() {
        return userService.getAdminList();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int userNo) {
        return userService.getUserById(userNo);
    }

    @PostMapping("/register")
    public void insertUser(@RequestBody User user) {
        userService.insertUser(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable("id") int userNo, @RequestBody User user) {
        user.setUserNo(userNo);
        userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int userNo) {
        userService.deleteUser(userNo);
    }

    @GetMapping("/check-id/{id}")
    public boolean checkId(@PathVariable("id") String userId) {
        return userService.checkIdExists(userId);
    }

}
