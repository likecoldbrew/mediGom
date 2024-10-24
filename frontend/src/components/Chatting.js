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

  const [availableUsers, setAvailableUsers] = useState([]); // 초대할 수 있는 사용자 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림 여부

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

      // Subscribe to the current room for receiving new messages
      const subscription = client.subscribe(`/topic/room/${currentChatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("Received message:", newMessage);

        // Update messages state for current chat room
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          setShowScrollButton(newMessage);
          return updatedMessages;
        });

        // Update the lastMessage for the corresponding chat room
        setChatRooms((prevChatRooms) =>
          prevChatRooms.map((room) =>
            room.chattingRoomId === currentChatRoomId
              ? { ...room, lastMessage: newMessage.message }
              : room
          )
        );
      });

      stompClientRef.current.subscription = subscription;
    }

    // Subscribe to all rooms for receiving last message updates
    chatRooms.forEach((room) => {
      const roomSubscription = client.subscribe(`/topic/room/${room.chattingRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log(`New message in room ${room.chattingRoomId}:`, newMessage);

        // Update the lastMessage for each room
        setChatRooms((prevChatRooms) =>
          prevChatRooms.map((r) =>
            r.chattingRoomId === room.chattingRoomId
              ? { ...r, lastMessage: newMessage.message }
              : r
          )
        );
      });
    });
  };

  const handleSendMessage = async () => {
    const client = stompClientRef.current;
    if (inputMessage.trim() !== "" && currentChatRoomId) {
      const newMessage = {
        message: inputMessage,
        chattingRoomId: currentChatRoomId,
        sender: userInfo.userNo,
        userName: userInfo.userName,
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

  // Utility function to count participants
  const getParticipantCount = (userNames) => {
    if (!userNames) return 0;
    return userNames.split(",").filter((name) => name.trim() !== "").length;
  };



  return (
    <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-grow">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            참가자({getParticipantCount(chatRooms.find((room) => room.chattingRoomId === currentChatRoomId)?.userNames)})
          </h2>
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
                  className={`text-sm ${
                    message.sender === userInfo.userNo ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  } p-2 rounded-md`}
                >
                  {message.userName} : {message.message}
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
            className="flex"
          >
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      <div className="w-64 border-l p-4">
        <h2 className="text-xl font-semibold mb-4">채팅방 목록</h2>
        <ul className="space-y-4">
          {chatRooms.map((room) => (
            <li
              key={room.chattingRoomId}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 ${
                currentChatRoomId === room.chattingRoomId ? "bg-blue-100" : ""
              }`}
              onMouseEnter={() => setShowFullText(room.chattingRoomId)}
              onMouseLeave={() => setShowFullText(null)}
              onClick={() => handleRoomClick(room.chattingRoomId)}
            >
              <div className="font-bold">
                {showFullText === room.chattingRoomId
                  ? room.userNames
                  : room.userNames.length > 12
                    ? `${room.userNames.slice(0, 12)}...`
                    : room.userNames}
              </div>
              <div className="text-sm text-gray-500">
                {room.lastMessage ? `${room.lastMessage.substring(0, 20)}` : "No messages yet"}
              </div>
            </li>
          ))}
        </ul>


      </div>
    </div>
  );
};

export default Chatting;
