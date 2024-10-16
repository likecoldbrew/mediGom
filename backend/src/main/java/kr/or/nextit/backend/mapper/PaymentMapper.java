package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.PaymentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PaymentMapper {

    // 모든 결제 정보 가져오기
    List<PaymentDTO> getAllPayments();

    // 특정 유저의 결제 내역 가져오기
    List<PaymentDTO> getPaymentsByUserNo(@Param("userNo") int userNo);

    // 특정 impuid로 결제 정보 조회
    PaymentDTO getPaymentByImpUid(@Param("impuid") String impuid);

    // 새로운 결제 정보 삽입
    void insertPayment(PaymentDTO payment);

    // 결제 정보 업데이트
    void updatePayment(PaymentDTO payment);

    // impuid로 결제 정보 삭제
    void deletePaymentByImpUid(@Param("impuid") String impuid);

    // impuid로 결제 건수 확인 (중복 결제 검사)
    int countByImpUid(@Param("impuid") String impuid);
}
