import { useState, useEffect } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import axios from 'axios'; // Axios를 사용하여 API 호출

const Chatting = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 어떤 도움이 필요하신가요?", sender: 'bot' },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [chatRooms, setChatRooms] = useState([]) // 초기값 빈 배열로 변경
  const [userInfo, setUserInfo] = useState(null) // 사용자 정보를 저장할 상태 추가

  // 사용자 정보를 가져오는 함수
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
            fetchChatRooms(data.userNo); // 사용자 번호로 채팅방 목록을 불러옴
          } else {
            console.error('사용자 정보를 가져오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('에러가 발생했습니다:', error);
        }
      }
    };

    fetchUserInfo(); // useEffect 실행 시 사용자 정보 가져오기
  }, []);

  // 사용자가 속한 채팅방 목록을 불러오는 함수
  const fetchChatRooms = async (userNo) => {
    try {
      const response = await axios.get(`/chat/rooms/${userNo}`);
      setChatRooms(response.data); // 응답 데이터를 상태로 설정
    } catch (error) {
      console.error('채팅방 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user'
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "메시지 감사합니다. 더 필요한 것이 있으신가요?",
          sender: 'bot'
        }
        setMessages(prevMessages => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-grow">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">채팅 지원</h2>
        </div>
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  {message.sender === 'user' ? '사' : '봇'}
                </div>
                <div
                  className={`mx-2 py-2 px-3 rounded-lg ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="메시지 보내기"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      <div className="w-64 border-l">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">채팅방 목록</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-144px)]">
          {chatRooms.map((room) => (
            <div key={room.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-800">{room.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chatting;
