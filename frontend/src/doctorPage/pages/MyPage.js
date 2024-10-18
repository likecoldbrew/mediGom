import React, { useState, useRef } from "react";
import { Camera, Plus } from "lucide-react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Component() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // 상태 추가
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    id: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요
    console.log("Form submitted", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 필요시 폼 필드를 초기화하거나 상태를 초기값으로 설정
    setFormData({
      name: "",
      department: "",
      id: "",
      email: "",
      password: "",
      phone: "",
      address: ""
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-40 h-40 relative mb-4 md:mb-0">
            <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-grow space-y-8">
            <div>
              <label htmlFor="name" className="block text-m font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name} // 상태에서 값 가져오기
                onChange={handleChange} // 변경 이벤트 핸들러
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={!isEditing} // isEditing이 false일 경우 비활성화
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-m font-medium text-gray-700">
                근무과
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department} // 상태에서 값 가져오기
                onChange={handleChange} // 변경 이벤트 핸들러
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={!isEditing} // isEditing이 false일 경우 비활성화
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="id" className="block text-m font-medium text-gray-700">
            아이디
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id} // 상태에서 값 가져오기
              onChange={handleChange} // 변경 이벤트 핸들러
              className="flex-grow rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!isEditing} // isEditing이 false일 경우 비활성화
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-m font-medium text-gray-700">
            이메일
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email} // 상태에서 값 가져오기
              onChange={handleChange} // 변경 이벤트 핸들러
              className="flex-grow rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!isEditing} // isEditing이 false일 경우 비활성화
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-m font-medium text-gray-700">
            비밀번호
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password} // 상태에서 값 가져오기
              onChange={handleChange} // 변경 이벤트 핸들러
              className="flex-grow rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!isEditing} // isEditing이 false일 경우 비활성화
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-m font-medium text-gray-700">
            전화번호
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone} // 상태에서 값 가져오기
              onChange={handleChange} // 변경 이벤트 핸들러
              className="flex-grow rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!isEditing} // isEditing이 false일 경우 비활성화
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-m font-medium text-gray-700">
            주소
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address} // 상태에서 값 가져오기
            onChange={handleChange} // 변경 이벤트 핸들러
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            disabled={!isEditing} // isEditing이 false일 경우 비활성화
          />
        </div>

        <div className="flex justify-center space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-yellow-400"
            >
              변경
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-500"
              >
                등록
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500"
              >
                취소
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
