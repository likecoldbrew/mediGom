package kr.or.nextit.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey; // 비밀 키

    @Value("${jwt.expiration}")
    private long expirationTime; // 유효 기간

    /**
     * JWT 토큰을 생성합니다.
     * @param userId 사용자 ID
     * @return 생성된 JWT 토큰
     */
    public String generateToken(String userId) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expirationDate = new Date(nowMillis + expirationTime);

        JwtBuilder builder = Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secretKey);

        return builder.compact();
    }

    /**
     * JWT 토큰의 유효성을 검사합니다.
     * @param token JWT 토큰
     * @return 유효한 경우 true, 그렇지 않은 경우 false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true; // 유효한 토큰일 경우
        } catch (ExpiredJwtException e) {
            // 만료된 토큰 처리
            System.out.println("토큰이 만료되었습니다.");
            return false;
        } catch (MalformedJwtException e) {
            // 형식이 잘못된 토큰 처리
            System.out.println("형식이 잘못된 토큰입니다.");
            return false;
        } catch (Exception e) {
            return false; // 유효하지 않은 토큰일 경우
        }
    }

    /**
     * JWT 토큰에서 사용자 ID를 가져옵니다.
     * @param token JWT 토큰
     * @return 사용자 ID
     */
    public String getUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject(); // 사용자 ID 반환
        } catch (Exception e) {
            // 로그를 남기거나 예외를 던지기
            return null; // 또는 적절한 예외 처리를 수행
        }
    }
}
