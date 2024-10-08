package kr.or.nextit.backend.repository;
import kr.or.nextit.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserId(String userId); // 사용자 ID 존재 여부 확인
}