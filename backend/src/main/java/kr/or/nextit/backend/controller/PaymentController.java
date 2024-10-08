package kr.or.nextit.backend.controller;

import com.siot.IamportRestClient.exception.IamportResponseException;
import kr.or.nextit.backend.model.PaymentDto;
import kr.or.nextit.backend.service.PaymentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @ResponseBody
    @RequestMapping("/verify/{imp_uid}") // https://URL/verify/{거래고유번호}
    public PaymentDto paymentByImpUid(@PathVariable("imp_uid") String imp_uid,
                                      @RequestParam("userNo") int userNo) // userNo 추가
            throws IamportResponseException, IOException {
        return paymentService.verifyPayment(imp_uid, userNo); // 결제 검증 및 DB 값 삽입
    }
}
