package kr.or.nextit.backend.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import kr.or.nextit.backend.entity.PaymentEntity;
import kr.or.nextit.backend.model.PaymentDto;
import kr.or.nextit.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PaymentService {

    private final IamportClient iamportClient;
    private final PaymentRepository paymentRepository;

    // 환경 변수에서 API 키와 시크릿 값을 불러옵니다.
    public PaymentService(
            PaymentRepository paymentRepository,
            @Value("${iamport.api.key}") String apiKey,
            @Value("${iamport.api.secret}") String apiSecret
    ) {
        // 포트원 토큰 발급을 위해 API 키와 시크릿을 iamportClient에 전달
        this.iamportClient = new IamportClient(apiKey, apiSecret);
        this.paymentRepository = paymentRepository;
    }

    public PaymentDto verifyPayment(String imp_uid, int userNo) throws IamportResponseException, IOException {
        try {
            // 결제 검증 시작
            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(imp_uid);

            // 검증 결과가 null이거나 결제 정보가 없을 경우 예외 처리
            if (iamportResponse.getResponse() == null) {
                return PaymentDto.builder()
                        .impuid(imp_uid)
                        .status("결제 정보가 없습니다.")
                        .build();
            }

            // 결제 정보에서 필요한 값 추출
            Long amount = iamportResponse.getResponse().getAmount().longValue();
            String name = iamportResponse.getResponse().getName();
            String payMethod = iamportResponse.getResponse().getPgProvider();
            String status = iamportResponse.getResponse().getStatus();

            // Dto 변환
            PaymentDto paymentDto = PaymentDto.builder()
                    .impuid(imp_uid)
                    .name(name)
                    .payMethod(payMethod)
                    .amount(amount)
                    .status(status)
                    .userNo(userNo)
                    .build();

            // 결제 중복 여부 확인
            if (paymentRepository.countByImpuidContainsIgnoreCase(imp_uid) == 0) {
                // 결제가 정상적으로 이루어졌는지 확인
                if ("paid".equals(status)) {
                    PaymentEntity paymentEntity = new PaymentEntity(paymentDto);
                    paymentRepository.save(paymentEntity); // Entity 저장
                    return paymentDto; // 정상 처리된 결제 정보 반환
                } else {
                    paymentDto.setStatus("결제 오류입니다. 다시 시도해주세요.");
                    return paymentDto;
                }
            } else {
                paymentDto.setStatus("이미 결제되었습니다.");
                return paymentDto;
            }
        } catch (IamportResponseException | IOException e) {
            // 결제 검증 중 예외 발생 시 처리
            return PaymentDto.builder()
                    .impuid(imp_uid)
                    .status("결제 검증 중 오류가 발생했습니다: " + e.getMessage())
                    .build();
        }
    }
}