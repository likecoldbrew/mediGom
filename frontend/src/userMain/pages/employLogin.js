import '../style/empLogin.css';
import React, { useState } from 'react';

const SignInSignUp = () => {
    // 상태를 사용하여 패널의 활성화 여부를 관리합니다.
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Sign Up 버튼 클릭 시 상태를 업데이트합니다.
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    // Sign In 버튼 클릭 시 상태를 업데이트합니다.
    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-montserrat h-screen m-[-20px_0_50px]" >
            <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
            <div
                className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
                id="container"
            >
                {/* Sign Up 폼 */}
                <div className="form-container sign-up-container">
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center" action="#">
                        <h1 className="font-bold m-0">Create Account</h1>

                        <span  className="text-[12px]">or use your email for registration</span>
                        <input  className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="text" placeholder="Name"/>
                        <input  className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="email" placeholder="Email"/>
                        <input  className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="password" placeholder="Password"/>
                        <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white" >Sign Up</button>
                    </form>
                </div>

                {/* Sign In 폼 */}
                <div className="form-container sign-in-container">
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center" action="#">
                        <h1 className="font-bold m-0">Sign in</h1>
                        <span  className="text-[12px]">or use your account</span>
                        <input  className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="email" placeholder="Email"/>
                        <input  className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="password" placeholder="Password"/>
                        <a className="text-[#333] text-[14px] no-underline my-4" href="#">Forgot your password?</a>
                        <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost:bg-transparent ghost:border-white">Sign In</button>
                    </form>
                </div>

                {/* 오버레이 컨테이너 */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* 오버레이 왼쪽 패널 */}
                        <div className="overlay-panel overlay-left">
                            <h1 className="font-bold m-0">Welcome Back!</h1>
                            <p className="text-[14px] font-[100] leading-[20px] tracking-[0.5px] my-5 mb-7.5">To keep connected with us please login with your personal info</p>
                            <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none ghost active:scale-95 ghost:bg-transparent ghost:border-white"  id="signIn" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>
                        {/* 오버레이 오른쪽 패널 */}
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className="text-[14px] font-[100] leading-[20px] tracking-[0.5px] my-5 mb-7.5">Enter your personal details and start journey with us</p>
                            <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white" id="signUp" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 (필요에 따라 수정하세요) */}
            <footer  className="bg-[#222] text-white text-sm fixed bottom-0 left-0 right-0 text-center z-[999]">
                <p className="my-2.5">© 2024 MediGom Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SignInSignUp;
