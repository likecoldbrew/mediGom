package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/medical_record")
@RequiredArgsConstructor
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    @GetMapping("/{doctorNo}")
    public List<MedicalRecord> getMedicalRecordList(@PathVariable("doctorNo") int doctorNo) {
        return medicalRecordService.getMedicalRecordList(doctorNo);
    }
}
