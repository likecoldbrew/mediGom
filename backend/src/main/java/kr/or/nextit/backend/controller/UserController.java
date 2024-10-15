package kr.or.nextit.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.service.DoctorInfoService;
import org.springframework.web.bind.annotation.*;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final DoctorInfoService doctorInfoService;

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

    // 조회
    @GetMapping("/{id}")
    public Map<String, Object> getUserById(@PathVariable("id") int userNo) {
        Map<String, Object> response = new HashMap<>();
        User user = userService.getUserById(userNo);
        response.put("user", user);

        if (userNo > 1000) {
            response.put("education", doctorInfoService.getDoctorEducation(userNo));
            response.put("career", doctorInfoService.getDoctorCareer(userNo));
        }
        return response;
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
