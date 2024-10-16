package kr.or.nextit.backend.controller;

import com.siot.IamportRestClient.exception.IamportResponseException;
import kr.or.nextit.backend.model.PaymentDTO;
import kr.or.nextit.backend.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Controller
@RequestMapping("/verify")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @ResponseBody
    @PostMapping("/{imp_uid}")
    public PaymentDTO verifyAndInsertPayment(
            @PathVariable("imp_uid") String imp_uid,
            @RequestParam("userNo") int userNo,
            @RequestBody PaymentDTO paymentDTO) throws IamportResponseException, IOException {
        try {
            boolean isPaymentValid = paymentService.verifyPayment(imp_uid, userNo);

            if (!isPaymentValid) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment is invalid or already processed.");
            }

            paymentDTO.setImpuid(imp_uid);
            paymentService.insertPayment(paymentDTO);

            return paymentDTO;

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
