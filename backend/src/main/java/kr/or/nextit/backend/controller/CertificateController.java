package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Certificate;
import kr.or.nextit.backend.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping
    public ResponseEntity<Void> createCertificate(@RequestBody Certificate certificate) {
        certificateService.createCertificate(certificate);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{certificateId}")
    public ResponseEntity<Certificate> getCertificateById(@PathVariable int certificateId) {
        Certificate certificate = certificateService.getCertificateById(certificateId);
        return ResponseEntity.ok(certificate);
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        List<Certificate> certificates = certificateService.getAllCertificates();
        return ResponseEntity.ok(certificates);
    }

    @PutMapping("/{certificateId}")
    public ResponseEntity<Void> updateCertificate(@PathVariable int certificateId, @RequestBody Certificate certificate) {
        certificate.setCertificateId(certificateId);
        certificateService.updateCertificate(certificate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{certificateId}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable int certificateId) {
        certificateService.deleteCertificate(certificateId);
        return ResponseEntity.noContent().build();
    }
}
