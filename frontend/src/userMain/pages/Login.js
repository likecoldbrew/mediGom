import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> main
import "../style/tailwind.css";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
<<<<<<< HEAD
=======
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
>>>>>>> main

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", formData);
  };

=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 요청을 위한 API 호출
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: formData.id,
          userPass: formData.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // 응답을 텍스트로 읽기
        setErrorMessage(errorText); // 텍스트를 직접 에러 메시지로 설정
        return;
      }

      const token = await response.text();
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", token);
      // 로그인 성공 후 대시보드 또는 원하는 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

>>>>>>> main
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-sky-100 py-2 border-y border-sky-200">
        <div className="container mx-auto px-4 flex items-center">
          <Link to="/" className="h-24">
          <img
            src="/images/userMain/logo.png"
            className="h-16 mr-2"
            alt="logo"
          />
          </Link>
          <p className="text-lg font-bold">
            medi<span className="text-yellow-500">Gom</span>
          </p>
        </div>
      </header>
      <div className="flex-grow flex flex-col lg:flex-row justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
          <div className="bg-green-100 rounded-full p-8 max-w-md mx-auto relative">
            <Link to="/" className="h-24">
            <img
              src="/images/userMain/logo.png"
              alt="logo"
              className="w-full h-auto"
            />
            </Link>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-sky-100 bg-opacity-75 px-4 py-2 rounded-lg">
<<<<<<< HEAD
                <p className="text-xl font-bold ttext-blue-900 text-center">
=======
                <p className="text-xl font-bold text-blue-900 text-center">
>>>>>>> main
                  편리한 의료 서비스 <br />
                  메디곰에 오신 걸 환영합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              로그인
            </h2>
<<<<<<< HEAD
=======
            {errorMessage && (
              <div className="text-red-600 text-center mb-4">{errorMessage}</div>
            )}
>>>>>>> main
            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  아이디
                </label>
                <div className="mt-1">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    로그인 상태 유지
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-sky-600 hover:text-sky-500"
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  로그인
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center text-sm text-gray-500 mb-2">
                계정이 없으신가요?
              </div>
              <Link
<<<<<<< HEAD
                to="/signUp"
=======
                to="/frontend/src/userMain/pages/Signup"
>>>>>>> main
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-gray-50"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  );
}
