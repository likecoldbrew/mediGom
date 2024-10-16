package kr.or.nextit.backend.config;

import kr.or.nextit.backend.filter.JwtAuthenticationFilter;
import kr.or.nextit.backend.service.CustomUserDetailsService;
import kr.or.nextit.backend.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MyBasicAuthEntryPoint authEntryPoint;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService; // UserDetailsService 주입

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 보호 비활성화
                .csrf(AbstractHttpConfigurer::disable // CSRF 보호 비활성화
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register").permitAll() // 사용자 등록 허용
                        .requestMatchers("/api/category/admin/**").authenticated() // 관리자 접근 필요
                        .requestMatchers("/api/category/doctor/**").authenticated() // 의사 접근 필요
                        .anyRequest().permitAll() // 나머지 요청 허용
                )
                .httpBasic(httpBasic -> httpBasic
                        .authenticationEntryPoint(authEntryPoint) // 인증 진입점 설정
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, userDetailsService), UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화
    }
}
