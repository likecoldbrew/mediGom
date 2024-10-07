import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/index.css";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        birthdate: '',
        gender: '',
        phone: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full bg-sky-100 py-2 border-y border-sky-200">
                <div className="container mx-auto px-4 flex items-center">
                    <img src="/images/userMain/logo.png" className="h-16 mr-2" alt="logo"/>
                    <p className="text-lg font-bold">
                        medi<span className="text-yellow-500">Gom</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                    <div className="bg-green-100 rounded-full p-8 max-w-md mx-auto relative">
                        <img src="/images/userMain/logo.png" alt="logo" className="w-full h-auto"/>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-sky-100 bg-opacity-75 px-4 py-2 rounded-lg">
                                <p className="text-xl font-bold text-blue-900 text-center">편리한 의료 서비스 <br/>메디곰에 오신 걸 환영합니다.</p>
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
                                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                    아이디
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        id="id"
                                        name="id"
                                        type="text"
                                        required
                                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="ml-3 inline-flex items-center justify-center w-1/4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    비밀번호 확인
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    이름
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                                    생년월일
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="birthdate"
                                        name="birthdate"
                                        type="date"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">성별</label>
                                <div className="mt-1 flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                        <span className="ml-2">남</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                        <span className="ml-2">여</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    전화번호
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        className="appearance-none w-3/4 block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="ml-3 inline-flex items-center justify-center w-1/4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white  bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    이메일
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="ml-3 justify-center w-1/4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white b bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    회원가입
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    이미 아이디가 있으신가요?
                  </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    to="/login"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-gray-50"
                                >
                                    로그인하러 가기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-sky-100 text-sky-800 py-4 mt-1">
                <div className="container mx-auto px-4 flex items-center justify-center">
                    <img src="/images/userMain/logo.png" className="h-16 mr-4" alt="logo"/>
                    <div className="text-center">
                        <p>주소주소 대표전화: 1555-1234</p>
                        <p>&copy; 2024 mediGom. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
