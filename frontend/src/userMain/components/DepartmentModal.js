import React from "react";

const Modal = ({ isOpen, onClose, department }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-3">
          {department.departmentName}
        </h2>
        <p className="text-gray-600">
          진료분야: {department.treatments.join(", ")}
        </p>
        <p className="mt-4">담당 의사: {department.userNames}</p>{" "}
        {/* 의사 이름 표시 */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
