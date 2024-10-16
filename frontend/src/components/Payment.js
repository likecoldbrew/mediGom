import React, { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const ClickChargeBtn = (pg_method, userNo, amount, redirect_url) => {
    const { IMP } = window;
    IMP.init("imp37441202"); // 가맹점 번호 지정
    IMP.request_pay(
      {
        pg: `${pg_method}`, // 결제 방식 지정
        payMethod: `${pg_method}`,
        name: "포인트 충전",
        amount: amount, // 충전할 금액
        m_redirect_url: redirect_url, // 만약 새창에서 열린다면 결제 완료 후 리다이렉션할 주소
      },
      function (rsp) {
        if (rsp.success) {
          // 결제 성공 시 DB에 결제 정보 저장
          axios
            .post(
              `http://localhost:8080/verify/${rsp.imp_uid}?userNo=${userNo}`, // POST 요청
              {
                name: "포인트 충전",
                payMethod: pg_method,
                amount: amount,
                status: "paid",
              }
            )
            .then((response) => {
              console.log("결제 검증 및 DB 저장 성공:", response.data);
              alert("결제 검증 성공");
            })
            .catch((error) => {
              console.error("결제 검증 실패:", error);
              alert("결제 검증 실패");
            });
        } else {
          alert("결제 실패");
          console.log(rsp);
        }
      }
    );
  };

  return (
    <div className="App">
      <h1>Test</h1>
      <p>
        금액
        <input type="number" className="amount" onChange={handleChange} />
      </p>
      <button
        onClick={() =>
          ClickChargeBtn(
            "kakaopay",
            123,
            amount,
            "http://localhost:3000/redirect"
          )
        }
      >
        카카오페이
      </button>
      <button
        onClick={() =>
          ClickChargeBtn(
            "tosspay",
            123,
            amount,
            "http://localhost:3000/redirect"
          )
        }
      >
        토스페이
      </button>
    </div>
  );
}

export default App;
