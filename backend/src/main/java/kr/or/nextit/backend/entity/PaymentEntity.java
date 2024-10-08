package kr.or.nextit.backend.entity;

import jakarta.persistence.*;
import kr.or.nextit.backend.model.PaymentDto;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "payment_list", indexes = {@Index(name = "impuid_index", columnList = "impuid", unique = true)})
// impuid 인덱스 생성
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentEntity {
    // DB 내부 결제 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long payment_id;

    // 결제 고유 번호
    @Column(name = "impuid")
    private String impuid;

    // 유저 정보
    @Column
    private int userNo;

    // 상품명
    @Column(length = 255)
    private String name;

    // 결제타입
    @Column
    private String payMethod;

    // 금액
    @Column
    private Long amount;

    // 결제 여부
    @Column
    private String status;

    // Dto -> Entity 변환
    public PaymentEntity(PaymentDto dto) {
        this.impuid = dto.getImpuid();
        this.userNo = dto.getUserNo();
        this.name = dto.getName();
        this.payMethod = dto.getPayMethod();
        this.amount = dto.getAmount();
        this.status = dto.getStatus();
    }
}