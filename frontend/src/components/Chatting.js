import { useState, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import axios from 'axios';

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [currentChatRoomId, setCurrentChatRoomId] = useState(null);
  const [showFullText, setShowFullText] = useState(null);

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
          fetchChatRooms(data.userNo);
        } else {
          console.error('Failed to fetch user info.');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  };

  const fetchChatRooms = async (userNo) => {
    try {
      const response = await axios.get(`/api/chatting/user/${userNo}`);
      if (response.status === 200) {
        setChatRooms(response.data);
      } else {
        console.error('Server error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const fetchMessagesByRoomId = async (chattingRoomId) => {
    console.log("Fetching messages for room ID:", chattingRoomId);
    if (!chattingRoomId) {
      console.error("Invalid chatting room ID.");
      return;
    }
    try {
      const response = await axios.get(`/api/chatting/messages/${chattingRoomId}`);
      if (response.status === 200) {
        setMessages(response.data);
        console.log('Chat room messages:', response.data);
      } else {
        console.error('Error fetching messages:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '' && currentChatRoomId) {
      const newMessage = {
        text: inputMessage,
        chattingRoomId: currentChatRoomId,
      };

      try {
        await axios.post('/api/chatting/messages', newMessage);
        setMessages([...messages, newMessage]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleRoomClick = (roomId) => {
    setCurrentChatRoomId(roomId);
    fetchMessagesByRoomId(roomId);
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-grow">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Chat Support</h2>
        </div>
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === userInfo.userNo ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end ${message.sender === userInfo.userNo ? 'flex-row-reverse' : ''}`}>

                {message.userName}
                <div className={`mx-2 py-2 px-3 rounded-lg ${message.sender === userInfo.userNo ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {message.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      <div className="w-64 border-l">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Chat Rooms</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-144px)]">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              onMouseEnter={() => setShowFullText(room.id)}
              onMouseLeave={() => setShowFullText(null)}
              onClick={() => handleRoomClick(room.chattingRoomId)}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-800">
                    {showFullText === room.id ? room.userNames : (room.userNames.length > 12 ? `${room.userNames.slice(0, 12)}...` : room.userNames)}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
                </div>
              </div>
              {/* Display the profile picture and last message */}
              <div className="flex items-center space-x-3 mt-2">
                {room.profileImage && (
                  <img src={room.profileImage} alt={room.userName} className="w-8 h-8 rounded-full" />
                )}
                <span className="text-sm text-gray-600">{room.lastMessage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatting;
