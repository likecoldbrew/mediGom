import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [currentChatRoomId, setCurrentChatRoomId] = useState(null);
  const stompClientRef = useRef(null);
  const messageEndRef = useRef(null); // Ref to scroll to the end
  const chatContainerRef = useRef(null); // Ref to the chat container
  const [showFullText, setShowFullText] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if at the bottom of chat
  const [showScrollButton, setShowScrollButton] = useState(false); // Track if scroll button should be shown

  useEffect(() => {
    fetchUserInfo();
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (currentChatRoomId) {
      connectWebSocket();
      fetchMessagesByRoomId(currentChatRoomId); // Ensure messages are fetched when the room changes
    }
  }, [currentChatRoomId]);

  useEffect(() => {
    // Scroll to the bottom when messages change if at bottom
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          fetchChatRooms(data.userNo);
        } else {
          console.error("Failed to fetch user info.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const fetchChatRooms = async (userNo) => {
    try {
      const response = await axios.get(`/api/chatting/user/${userNo}`);
      if (response.status === 200) {
        setChatRooms(response.data);
      } else {
        console.error("Server error while fetching chat rooms:", response.status);
      }
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const fetchMessagesByRoomId = async (chattingRoomId) => {
    if (!chattingRoomId) {
      console.error("Invalid chat room ID.");
      return;
    }
    try {
      const response = await axios.get(`/api/chatting/messages/${chattingRoomId}`);
      if (response.status === 200) {
        setMessages(response.data);
      } else {
        console.error("Error fetching messages:", response.status);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(`STOMP: ${str}`),
      onConnect: () => {
        console.log("STOMP: WebSocket connected");
        stompClientRef.current = client;
        subscribeToRoomMessages(client);
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onDisconnect: () => {
        console.log("STOMP: WebSocket disconnected");
      },
    });

    client.activate();
  };

  const subscribeToRoomMessages = (client) => {
    if (currentChatRoomId) {
      if (stompClientRef.current?.subscription) {
        stompClientRef.current.subscription.unsubscribe();
      }

      const subscription = client.subscribe(`/topic/room/${currentChatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("Received message:", newMessage);

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          setShowScrollButton(newMessage);
          return updatedMessages;
        });
      });

      stompClientRef.current.subscription = subscription;
    }
  };

  const handleSendMessage = async () => {
    const client = stompClientRef.current;
    if (inputMessage.trim() !== "" && currentChatRoomId) {
      const newMessage = {
        message: inputMessage,
        chattingRoomId: currentChatRoomId,
        sender: userInfo.userNo,
      };
      if (client && client.connected) {
        try {
          console.log("Sending message:", newMessage);
          client.publish({
            destination: `/app/chat.sendMessage`,
            body: JSON.stringify(newMessage),
          });

          setInputMessage("");
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.error("STOMP client not connected or not initialized.", client);
      }
    } else {
      console.error("Invalid input or no current chat room ID.");
    }
  };

  const handleRoomClick = (roomId) => {
    setCurrentChatRoomId(roomId);
    fetchMessagesByRoomId(roomId); // Fetch messages when a room is clicked
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1); // Check if at bottom
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-grow">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">참가자()</h2>
        </div>
        <div
          className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4"
          ref={chatContainerRef}
          onScroll={handleScroll} // Add scroll event handler
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === userInfo.userNo ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end ${message.sender === userInfo.userNo ? "flex-row-reverse" : ""}`}>
                <span
                  className={`text-sm ${message.sender === userInfo.userNo ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} p-2 rounded-md`}
                >
                  {message.message}
                </span>
              </div>
            </div>
          ))}
          {/* Reference element for scrolling */}
          <div ref={messageEndRef} />
        </div>
        {/* Scroll to Bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-10 right-10 bg-green-500 text-white p-2 rounded-md shadow-md"
          >
            새로운 채팅
          </button>
        )}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md p-2"
                placeholder="메시지를 입력하세요..."
              />
              <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md">
                <Send />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/3 border-l border-gray-300">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">채팅방</h2>
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
                    {showFullText === room.id ? room.userNames : room.userNames.length > 12 ? `${room.userNames.slice(0, 12)}...` : room.userNames}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
                </div>
              </div>
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
