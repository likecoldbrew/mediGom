package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.CertificateMapper;
import kr.or.nextit.backend.model.Certificate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class CertificateService {

    @Autowired
    private CertificateMapper certificateMapper;

    public void createCertificate(Certificate request) {
        Certificate certificate = new Certificate(
                request.patientName,
                request.doctorName,
                request.departmentNo,
                request.certificateType,
                Date.valueOf(request.issueDate),
                request.details
        );

        certificateMapper.insertCertificate(certificate);
    }
}
