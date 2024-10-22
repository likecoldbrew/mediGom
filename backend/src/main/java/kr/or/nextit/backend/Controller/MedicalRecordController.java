package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/patientCheckList")
    public ResponseEntity<List<MedicalRecord>> getAllPatientList() {
        return ResponseEntity.ok(medicalRecordService.getAllPatientList());
    }


    @PostMapping("/insertRecord")
    public void insertMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        medicalRecordService.addMedicalRecord(medicalRecord);
    }

    // 환자 진료 정보 수정 엔드포인트
    @PutMapping("/updateRecord")
    public ResponseEntity<String> updateRecord(@RequestBody MedicalRecord medicalRecord) {
        try {
            medicalRecordService.updateMedicalRecord(medicalRecord);
            return ResponseEntity.ok("Medical record updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating medical record");
        }
    }

    @PutMapping("/{recordId}")
    public ResponseEntity<Void> updateMedicalRecord(
            @PathVariable("recordId") int recordId,
            @RequestBody MedicalRecord updatedRecord) {
        medicalRecordService.updateMedicalRecord(recordId, updatedRecord);
        return ResponseEntity.noContent().build();
    }
}
