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
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showFullText, setShowFullText] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [inviteUsers, setInviteUsers] = useState([]); // Users to invite

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/doctors"); // Fetching users from the Spring Boot server
      const data = await response.json();
      setInviteUsers(data); // Update state with fetched users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch user info and chat rooms, connect WebSocket, etc.
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
      fetchMessagesByRoomId(currentChatRoomId);
    }
  }, [currentChatRoomId]);

  useEffect(() => {
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
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setShowScrollButton(newMessage);
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

    chatRooms.forEach((room) => {
      const roomSubscription = client.subscribe(`/topic/room/${room.chattingRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log(`New message in room ${room.chattingRoomId}:`, newMessage);
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
    fetchMessagesByRoomId(roomId);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
  };

  const getParticipantCount = (userNames) => {
    if (!userNames) return 0;
    return userNames.split(",").filter((name) => name.trim() !== "").length;
  };

  const handleCreateChatRoom = async (selectedUsers) => {
    const client = stompClientRef.current;

    if (selectedUsers.length === 0) {
      console.error("No users selected for the chat room.");
      return;
    }

    const newChatRoom = {
      chattingRoomId: currentChatRoomId,
      inviteUserNo: userInfo.userNo,     // List of invited user IDs
      userNo: selectedUsers,          // Current user ID

    };

    console.log("Creating chat room with:", newChatRoom); // Log for debugging

    if (client && client.connected) {
      client.publish({
        destination: `/app/chat.createRoom/${userInfo.userNo}`,
        body: JSON.stringify(newChatRoom) // JSON 형식으로
      });
    } else {
      console.error("STOMP client not connected or not initialized.");
    }
  };


// Modal 컴포넌트
  const Modal = ({ onClose, onCreateRoom }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const toggleUserSelection = (userNo) => {
      setSelectedUsers((prev) =>
        prev.includes(userNo)
          ? prev.filter((id) => id !== userNo)
          : [...prev, userNo]
      );
      console.log("Selected user No:", userNo);
    };

    const handleCreateRoom = () => {
      onCreateRoom(selectedUsers);
      onClose(); // Close the modal
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg mb-2 font-semibold">초대할 사용자 선택</h2>
          <ul>
            {inviteUsers.map((user) => (
              <li key={user.userNo}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.userNo)}
                    onChange={() => toggleUserSelection(user.userNo)}
                  />
                  <span>{user.userName}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 m-2 bg-blue-500 text-white rounded-lg"
              onClick={handleCreateRoom}
            >
              방 생성
            </button>
            <button
              className="px-4 py-2 m-2 bg-red-500 text-white rounded-lg mr-2"
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
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
          onScroll={handleScroll}
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
          <div ref={messageEndRef} />
        </div>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">채팅방 목록</h2>
          <button
            onClick={() => {
              setShowModal(true);
              fetchUsers();
            }}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring"
          >
            새 채팅방
          </button>
        </div>
        <ul className="space-y-4">
          {chatRooms.map((room) => (
            <li
              key={room.chattingRoomId}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 ${currentChatRoomId === room.chattingRoomId ? "bg-blue-100" : ""}`}
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
                {room.lastMessage ? `최근대화: ${room.lastMessage.substring(0, 8)}` : "No messages yet"}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onCreateRoom={handleCreateChatRoom} />
      )}
    </div>
  );
};

export default Chatting;
