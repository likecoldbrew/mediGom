package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical_record")
@RequiredArgsConstructor
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;


    // 의사 진단 목록 조회
    @GetMapping("/{doctorNo}")
    public List<MedicalRecord> getMedicalRecordList(@PathVariable("doctorNo") int doctorNo) {
        return medicalRecordService.getMedicalRecordList(doctorNo);
    }

    // 환자 진단 목록 조회
    @GetMapping("/user")
    public List<MedicalRecord> getUserMedicalRecordList(int userNo) {
        return medicalRecordService.getUserMedicalRecordList(userNo);
    }

    // 로그인 유저 진단 목록 조회
    @GetMapping("/loginUser/{userNo}")
    public List<MedicalRecord> loginUserMedicalRecord(@PathVariable int userNo) {
        return medicalRecordService.loginUserMedicalRecord(userNo);
    }

    // 특정 기록 목록 조회
    @GetMapping("/detail")
    public MedicalRecord getMedicalRecordDetail(int recordId) {
        return medicalRecordService.selectMedicalRecord(recordId);
    }

}
