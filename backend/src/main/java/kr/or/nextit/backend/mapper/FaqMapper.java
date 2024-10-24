package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Faq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FaqMapper {
    // 목록 조회
    List<Faq> selectAllFaq();
    // 아이템 하나 조회
    Faq selectFaq(int faqId);
    // 등록
    void insertFaq(Faq faq);
    // 수정
    void updateFaq(Faq faq);
    // 삭제
    void deleteFaq(int faqId);
    // 관리자 - 표시
    void showFaq(int faqId);
    // 관리자 - 목록 조회
    List<Faq> selectAdminAllFaq();
}

