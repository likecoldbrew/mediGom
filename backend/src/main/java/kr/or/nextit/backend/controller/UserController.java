package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.UserService;
import kr.or.nextit.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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

    // 현재 로그인한 사용자 정보 가져오기
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        String jwt = token.substring(7);

        // JWT에서 사용자 ID 추출
        String userId = jwtUtil.getUserIdFromToken(jwt);

        if (userId == null) {
            return ResponseEntity.status(401).body(null); // JWT가 유효하지 않으면 401 응답
        }

        // 사용자 ID로 사용자 정보 조회
        User user = userService.getUserById(userId);

        if (user == null) {
            return ResponseEntity.status(404).body(null); // 사용자 정보가 없으면 404 응답
        }

        return ResponseEntity.ok(user); // 사용자 정보 반환
    }

   /////////// //원래 쓰던거 /////////////////////////////
    //    @PutMapping("/update/{userNo}")
//    public ResponseEntity<Void> updateUser(@PathVariable int userNo, @RequestBody User user) {
//        user.setUserNo(userNo);
//        userService.updateUser(user);
//        return ResponseEntity.noContent().build();
//    }
    ////////////////////////////////////////////////////////

    @PutMapping("/update/{userNo}")
    public ResponseEntity<Void> updateUser(
            @PathVariable int userNo,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody User user) {

        // JWT 토큰을 Authorization 헤더에서 추출 (Bearer 스킴이 붙어있다고 가정)
        String jwt = authorizationHeader.substring(7); // "Bearer " 이후의 문자열

        user.setUserNo(userNo);
        userService.updateUser(user, jwt); // JWT를 함께 전달

        return ResponseEntity.noContent().build();
    }

}
