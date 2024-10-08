package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Certificate;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CertificateMapper {
    void insertCertificate(Certificate certificate);
}
