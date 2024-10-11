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
        amount: `${amount}`, // 충전할 금액
        m_redirect_url: `${redirect_url}`, // 만약 새창에서 열린다면 결제 완료 후 리다이렉션할 주소
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          // 만약 결제가 성공적으로 이루어졌다면
          axios
            .get(
              `http://localhost:8080/verify/` +
                rsp.imp_uid +
                `?userNo=${userNo}`
            ) // userNo 추가
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          alert("결제 성공");
          console.log(rsp);
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
        <input type="number" className="amount" onChange={handleChange}></input>
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
