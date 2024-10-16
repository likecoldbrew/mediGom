import React, { useState } from "react";
import "../style/tailwind.css";
import axios from "axios";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    rrn1: "",
    rrn2: "",
    add: "",
    add2: "",
    phone: "",
    email: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    rrn: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error message for the corresponding field
    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate ID (아이디)
    const idRegex = /^[A-Za-z0-9]+$/;
    if (!formData.id) {
      newErrors.id = "아이디는 필수 입력입니다.";
    } else if (!idRegex.test(formData.id)) {
      newErrors.id = "아이디는 영문과 숫자만 사용할 수 있습니다.";
    }

    // Validate Password (비밀번호)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "비밀번호는 필수 입력입니다.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "비밀번호는 최소 8자리 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // Validate Name (이름)
    const nameRegex = /^[가-힣A-Za-z]+$/;
    if (!formData.name) {
      newErrors.name = "이름은 필수 입력입니다.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "이름은 한글과 영문만 사용할 수 있습니다.";
    }

    // Validate Resident Registration Number (주민등록번호)
    const rrnRegex = /^(?![0]{6})[0-9]{6}-[0-9]{7}$/; // Format validation
    if (!formData.rrn1 || !formData.rrn2) {
      newErrors.rrn = "주민등록번호는 필수 입력입니다.";
    } else if (
      !/^[0-9]{6}$/.test(formData.rrn1) ||
      !/^[0-9]{7}$/.test(formData.rrn2)
    ) {
      newErrors.rrn = "주민등록번호는 올바른 형식이어야 합니다.";
    } else {
      const year = parseInt(formData.rrn1.substring(0, 2));
      const month = parseInt(formData.rrn1.substring(2, 4));
      const day = parseInt(formData.rrn1.substring(4, 6));
      const gender = formData.rrn2[0];
      const yearPrefix = gender === "1" || gender === "2" ? 1900 : 2000;

      // Validate the birth date
      const birthDate = new Date(yearPrefix + year, month - 1, day);
      if (
        birthDate.getFullYear() !== yearPrefix + year ||
        birthDate.getMonth() + 1 !== month ||
        birthDate.getDate() !== day
      ) {
        newErrors.rrn = "주민등록번호에 올바른 날짜가 아닙니다.";
      }
    }

    // Validate Phone Number (전화번호)
    const phoneRegex = /^010\d{8}$/; // Must start with 010 and have 11 digits total
    if (!formData.phone) {
      newErrors.phone = "전화번호는 필수 입력입니다.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "전화번호는 010으로 시작하며, 총 11자리여야 합니다.";
    }

    // Validate Email (이메일)
    if (!formData.email) {
      newErrors.email = "이메일은 필수 입력입니다.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    return newErrors;
  };

  const [isIdAvailable, setIsIdAvailable] = useState(null);

  // 아이디 중복 확인 함수
  const checkIdAvailability = async () => {
    try {
      const response = await axios.get(`/api/users/check-id/${formData.id}`);
      setIsIdAvailable(response.data); // 응답이 true/false로 온다고 가정
      console.log(response);
    } catch (error) {
      console.error("Error checking ID availability:", error);
      setIsIdAvailable(false);
      setErrorMessages((prev) => ({
        ...prev,
        id: "중복 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
    } else {
      const userData = {
        userId: formData.id,
        userPass: formData.password,
        userName: formData.name,
        userRrn: formData.rrn1 + "-" + formData.rrn2,
        email: formData.email,
        phone: formData.phone,
        userAdd: formData.add,
        userAdd2: formData.add2,
      };

      console.log("Form submitted:", userData);

      // JWT를 로컬 스토리지에서 가져오기
      const token = localStorage.getItem('jwt');

      try {
        // 사용자 등록 요청
        await axios.post("/api/users/register", userData, {
          headers: {
            'Authorization': `Bearer ${token}`, // JWT 추가
          }
        });
        console.log("User registered successfully");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-sky-100 py-2 border-y border-sky-200">
        <div className="container mx-auto px-4 flex items-center">
          <img
            src="/images/userMain/logo.png"
            className="h-16 mr-2"
            alt="logo"
          />
          <p className="text-lg font-bold">
            medi<span className="text-yellow-500">Gom</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
          <div className="bg-green-100 rounded-full p-8 max-w-md mx-auto relative">
            <img
              src="/images/userMain/logo.png"
              alt="logo"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-sky-100 bg-opacity-75 px-4 py-2 rounded-lg">
                <p className="text-xl font-bold text-blue-900 text-center">
                  편리한 의료 서비스 <br />
                  메디곰에 오신 걸 환영합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
              회원가입
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  아이디
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    placeholder="영문과 숫자만 입력해주세요."
                    required
                    className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                    value={formData.id}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={checkIdAvailability}
                    className="w-1/4 px-4 py-2 border border-gray-300 rounded-md bg-sky-500 text-white hover:bg-sky-600 focus:outline-none"
                  >
                    확인
                  </button>
                </div>
                {errorMessages.id && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.id}</p>
                )}
                {isIdAvailable === false && (
                  <p className="mt-1 text-red-600 text-sm">
                    해당 아이디는 이미 사용 중입니다.
                  </p>
                )}
                {isIdAvailable === true && (
                  <p className="mt-1 text-green-600 text-sm">
                    해당 아이디는 사용 가능합니다.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errorMessages.password && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errorMessages.confirmPassword && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.confirmPassword}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errorMessages.name && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rrn1"
                  className="block text-sm font-medium text-gray-700"
                >
                  주민등록번호
                </label>
                <div className="flex space-x-2">
                  <input
                    id="rrn1"
                    name="rrn1"
                    type="text"
                    placeholder="앞 6자리"
                    required
                    maxLength="6"
                    className="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                    value={formData.rrn1}
                    onChange={handleChange}
                  />
                  <input
                    id="rrn2"
                    name="rrn2"
                    type="text"
                    placeholder="뒤 7자리"
                    required
                    maxLength="7"
                    className="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                    value={formData.rrn2}
                    onChange={handleChange}
                  />
                </div>
                {errorMessages.rrn && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.rrn}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  전화번호
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="010XXXXXXXX"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errorMessages.phone && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errorMessages.email && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="add"
                  className="block text-sm font-medium text-gray-700"
                >
                  주소
                </label>
                <input
                  id="add"
                  name="add"
                  type="text"
                  placeholder="주소를 입력하세요"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.add}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="add2"
                  className="block text-sm font-medium text-gray-700"
                >
                  상세주소
                </label>
                <input
                  id="add2"
                  name="add2"
                  type="text"
                  placeholder="상세주소를 입력하세요"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-200 focus:border-sky-500 sm:text-sm"
                  value={formData.add2}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  가입하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
