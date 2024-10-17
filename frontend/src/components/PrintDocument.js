import React, { useState, useEffect } from 'react';

const PrintDocument = () => {
  // 로그인한 사용자 정보 상태
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token'); // JWT를 로컬 스토리지에서 가져옴
      if (token) {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // JWT 포함
          },
        });

        if (response.ok) {
          const data = await response.json(); // 서버에서 반환하는 사용자 정보
          setUserInfo(data); // 사용자 정보 상태 업데이트
          console.log(data)
        } else {
          console.error('사용자 정보를 가져오는 데 실패했습니다.');
        }
      }
    };

    fetchUserInfo();
  }, []);

  const openLocalHtml = () => {
    // 스프링 부트 서버에서 제공하는 HTML 파일 경로를 새 창으로 엽니다.
    window.open('http://localhost:8080/html/diagnosis.html', '_blank', 'width=800,height=600');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React에서 HTML 파일 열기</h1>

      {/* 로그인한 회원 정보를 표시 */}
      {userInfo ? (
        <div style={{ marginBottom: '20px' }}>
          <strong>현재 로그인한 회원:</strong> {userInfo.userName}
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>로그인 정보가 없습니다.</div>
      )}

      <button onClick={openLocalHtml} style={{ padding: '10px 20px', fontSize: '16px' }}>
        진단서 열기
      </button>
    </div>
  );
};

export default PrintDocument;
