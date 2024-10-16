package kr.or.nextit.backend.service;

import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(userId); // 사용자 ID로 조회
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        // UserDetails로 변환하여 반환
        return new org.springframework.security.core.userdetails.User(
                user.getUserId(),
                user.getUserPass(),
                new ArrayList<>() // 권한 목록
        );
    }
}
