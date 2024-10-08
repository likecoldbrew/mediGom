package kr.or.nextit.backend.repository;

import kr.or.nextit.backend.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
    public long countByImpuidContainsIgnoreCase(String impuid); // 결제 고유 번호 중복 확인
}