package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Prescription;
import kr.or.nextit.backend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {
    private final PrescriptionService prescriptionService;
    // 의사 처방 목록 조회
    @GetMapping("/{doctorNo}")
    public List<Prescription> getPrescriptionList(@PathVariable("doctorNo") int doctorNo) {
        return prescriptionService.getPrescriptionList(doctorNo);
    }

    // 환자 처방 목록 조회
    @GetMapping("/user")
    public List<Prescription> getUserPrescriptionList(int userNo) {
        return prescriptionService.getUserPrescriptionList(userNo);
    }

    // 특정 유저 기록 목록 조회 (진료과도 들어감)
    @GetMapping("/all/{userNo}")
    public List<Prescription> getMedicalRecordDetail(@PathVariable int userNo) {
        return prescriptionService.selectPrescription(userNo);
    }

    @GetMapping("/detail")
    public Prescription getPrescriptionDetail(@RequestParam int prescriptionId) {
        return prescriptionService.selectPrescriptionDetail(prescriptionId);
    }

}
