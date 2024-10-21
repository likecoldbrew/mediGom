import React, { useState, useEffect } from 'react';

const PrintDocument = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            console.log('사용자 정보:', data);
            fetchCertificatesByUserNo(data.userNo);
          } else {
            console.error('사용자 정보를 가져오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('에러가 발생했습니다:', error);
        }
      }
    };

    const fetchCertificatesByUserNo = async (userNo) => {
      try {
        const response = await fetch(`/api/certificates/user/${userNo}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('인증서 리스트:', data);

          // 응답이 객체일 경우 배열로 감싸기
          const certificateArray = Array.isArray(data) ? data : [data];
          setCertificates(certificateArray); // 상태 업데이트
        } else {
          console.error('인증서 정보를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('에러가 발생했습니다:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 진단서를 새 창에서 열기 위한 함수 (새 창 강제)
  const openLocalHtml = (userNo, certificateId, certificateType) => {
    const windowFeatures = 'width=800,height=600,scrollbars=yes,resizable=yes';

    // 새 창에서 진단서 열기
    const newWindow = window.open(
      `http://localhost:8080/certificates/print/${userNo}/${certificateId}/${certificateType}`,
      '_blank',
      windowFeatures
    );

    // 새 창이 정상적으로 열리면 포커스 맞추기
    if (newWindow) newWindow.focus();
  };

  useEffect(() => {
    console.log('현재 인증서 리스트:', certificates);
  }, [certificates]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>인증서 목록</h1>

      {userInfo ? (
        <div style={{ marginBottom: '20px' }}>
          <strong>현재 로그인한 회원:</strong> {userInfo.userName}
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>로그인 정보가 없습니다.</div>
      )}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {certificates && certificates.length > 0 ? (
          certificates.map((certificate) => (
            <li
              key={certificate.certificateId} // use certificateId as key
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px 0'
              }}
            >
              <span>인증서 ID: {certificate.certificateId} </span> <br />
              <span>내용: {certificate.disease}</span> <br />
              <button
                onClick={() =>
                  openLocalHtml(
                    certificate.userNo,
                    certificate.certificateId,
                    certificate.certificateType
                  )
                }
              >
                진단서 발급
              </button>
            </li>
          ))
        ) : (
          <li>인증서가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default PrintDocument;
