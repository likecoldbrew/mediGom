package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.UserService;
import kr.or.nextit.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        // 사용자가 입력한 ID로 사용자 조회
        User existingUser = userService.getUserById(user.getUserId());

        if (existingUser == null || !passwordEncoder.matches(user.getUserPass(), existingUser.getUserPass())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(existingUser.getUserId());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestBody User user) {
        userService.insertUser(user);
        return ResponseEntity.status(201).build();
    }


    @GetMapping("/check-id/{id}")
    public boolean checkId(@PathVariable("id") String userId) {
        return userService.checkIdExists(userId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN')") // ADMIN 역할만 접근 허용
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/patients")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')") // ADMIN 및 DOCTOR 역할만 접근 허용
    public ResponseEntity<List<User>> getPatientList() {
        return ResponseEntity.ok(userService.getPatientList());
    }

    @GetMapping("/doctors")
    @PreAuthorize("hasRole('ADMIN')") // ADMIN 역할만 접근 허용
    public ResponseEntity<List<User>> getDoctorList() {
        return ResponseEntity.ok(userService.getDoctorList());
    }

    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')") // ADMIN 역할만 접근 허용
    public ResponseEntity<List<User>> getAdminList() {
        return ResponseEntity.ok(userService.getAdminList());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')") // ADMIN 및 DOCTOR 역할만 접근 허용
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserByNo(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // ADMIN 역할만 접근 허용
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


}
