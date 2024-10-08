import React, {useState} from 'react';

function Payment() {
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const ClickChargeBtn = (pg_method, amount, nickname, redirect_url) => {
        const { IMP } = window;
        IMP.init('imp37441202'); // 가맹점 번호 지정
        IMP.request_pay({
                pg : `${pg_method}`, // 결제 방식 지정
                pay_method : 'card',
                merchant_uid: `mid_${new Date().getTime()}`, // 현재 시간
                name : '결제 품목 및 제목 지정',
                amount : `${amount}`, // 충전할 금액
                buyer_email : '구매자 이메일',
                buyer_name : `${nickname}`, // 충전 요청한 유저의 닉네임
                buyer_tel : '010-1222-2222',
                buyer_addr : '서울특별시 강남구 삼성동',
                buyer_postcode : '123-456',
                m_redirect_url: `${redirect_url}` // 만약 새창에서 열린다면 결제 완료 후 리다이렉션할 주소
            }, function (rsp) { // callback
                if (rsp.success) { // 만약 결제가 성공적으로 이루어졌다면
                    alert("결제 성공");
                } else {
                    alert("결제 실패");
                }
            }
        );
    }
    return (
        <div className="App">
            <h1>Test</h1>
            <p>금액<input type="number" className='amount' onChange={handleChange}></input></p>
            <button onClick={() => ClickChargeBtn('kakaopay', amount, 'nickname', 'http://localhost:3000/redirect')}>카카오페이</button>
            <button onClick={() => ClickChargeBtn('tosspay', amount, 'nickname', 'http://localhost:3000/redirect')}>토스페이</button>
        </div>
    );
}

export default Payment;