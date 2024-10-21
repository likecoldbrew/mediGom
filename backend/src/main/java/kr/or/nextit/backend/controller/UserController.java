package kr.or.nextit.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.UserService;
import kr.or.nextit.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
        // 사용자가 입력한 ID로 사용자 조회
        User existingUser = userService.getUserById(user.getUserId());

        if (existingUser == null || !passwordEncoder.matches(user.getUserPass(), existingUser.getUserPass())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(existingUser.getUserId());

        // JWT 토큰을 쿠키에 저장
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true); // 클라이언트 스크립트에서 접근할 수 없도록 설정
        cookie.setSecure(true); // HTTPS에서만 전송
        cookie.setPath("/"); // 모든 경로에서 유효하도록 설정
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7일 동안 유지
        response.addCookie(cookie); // 응답에 쿠키 추가

        // SameSite 속성을 응답 헤더에 추가
        response.setHeader("Set-Cookie", "token=" + token + "; HttpOnly; Secure; Path=/; Max-Age=" + (7 * 24 * 60 * 60) + "; SameSite=Strict");

        // 아이디 저장 옵션 추가 (쿠키로 저장)
        if (user.isRememberMe()) { // 클라이언트에서 체크박스 상태를 포함하여 보내도록 수정 필요
            Cookie idCookie = new Cookie("savedId", user.getUserId());
            idCookie.setHttpOnly(true); // 클라이언트 스크립트에서 접근할 수 없도록 설정
            idCookie.setSecure(true); // HTTPS에서만 전송
            idCookie.setPath("/"); // 모든 경로에서 유효하도록 설정
            idCookie.setMaxAge(7 * 24 * 60 * 60); // 7일 동안 유지
            response.addCookie(idCookie); // 응답에 쿠키 추가

            // SameSite 속성을 응답 헤더에 추가
            response.setHeader("Set-Cookie", "savedId=" + user.getUserId() + "; HttpOnly; Secure; Path=/; Max-Age=" + (7 * 24 * 60 * 60) + "; SameSite=Strict");
        }

        return ResponseEntity.ok(token); // 로그인 성공 시 토큰 반환
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
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/patients")
    public ResponseEntity<List<User>> getPatientList() {
        return ResponseEntity.ok(userService.getPatientList());
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<User>> getDoctorList() {
        return ResponseEntity.ok(userService.getDoctorList());
    }

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAdminList() {
        return ResponseEntity.ok(userService.getAdminList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserByNo(id));
    }

    @DeleteMapping("/{id}")
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

}
