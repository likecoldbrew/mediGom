package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.CertificateMapper;
import kr.or.nextit.backend.model.Certificate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    @Autowired
    private CertificateMapper certificateMapper;

    public void createCertificate(Certificate certificate) {
        certificateMapper.insertCertificate(certificate);
    }

    public Certificate getCertificateById(int certificateId) {
        return certificateMapper.selectCertificateById(certificateId);
    }

    public List<Certificate> getAllCertificates() {
        return certificateMapper.selectAllCertificates();
    }

    public void updateCertificate(Certificate certificate) {
        certificateMapper.updateCertificate(certificate);
    }

    public void deleteCertificate(int certificateId) {
        certificateMapper.deleteCertificate(certificateId);
    }
}