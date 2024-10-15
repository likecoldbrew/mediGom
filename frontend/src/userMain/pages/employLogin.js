import '../style/empLogin.css';
import React, {useState} from 'react';

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
        <div
            className=" flex justify-center items-center flex-col font-montserrat w-screen m-[-20px_0_50px]">
            <h2>MediGom 직원분들 환영합니다.</h2>
            <br/>
            <div
                className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
                id="container" style={{
                marginTop:'100px',
                width: '1000px', // 너비 설정
                height: '700px',
                minHeight: '480px', // 최소 높이 설정
            }}
            >
                {/* Sign Up 폼 */}
                <div className="form-container sign-up-container">
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
                          action="#">
                        <h1 className="font-bold m-0">회원가입</h1>
                        <div  className="flex items-center w-full">
                            <input id="empId" name="empId"
                                   className="w-3/4 bg-[#eee] border-none py-[12px] px-[15px] my-2" type="text"
                                   placeholder="아이디"/>
                            <button
                                className="rounded-[10px] w-1/4 border bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-bold py-[12px] px-[20px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white ml-2"
                                style={{ height: '50px' }}> 확인

                            </button>
                        </div>
                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="password"
                               placeholder="비밀번호"/>
                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="password"
                               placeholder="비밀번호 확인"/>
                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="text"
                               placeholder="이름"/>
                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="date"
                               placeholder="생년월일"/>
                        <div className="flex items-center w-full">
                            <input className="w-3/4 bg-[#eee] border-none py-[12px] px-[15px] my-2" type="tel"
                                   placeholder="전화번호"/>
                            <button
                                className="rounded-[10px] w-1/4 border bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-bold py-[12px] px-[20px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white ml-2">확인
                            </button>
                        </div>
                        <div className="flex items-center w-full">
                            <input className="w-3/4 bg-[#eee] border-none py-[12px] px-[15px] my-2" type="email"
                                   placeholder="이메일"/>
                            <button
                                className="rounded-[10px] w-1/4 border bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-bold py-[12px] px-[20px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white ml-2">확인
                            </button>
                        </div>
                        <button
                            className="rounded-[20px] border bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white mt-8">Sign
                            Up
                        </button>
                    </form>
                </div>

                {/* Sign In 폼 */}
                <div className="form-container sign-in-container">
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
                          action="#">
                        <h1 className="font-bold m-0">Sign in</h1>

                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="email"
                               placeholder="아이디"/>
                        <input className="bg-[#eee] border-none py-[12px] px-[15px] my-2 w-full" type="password"
                               placeholder="비밀번호"/>
                        <a className="text-[14px] mb-1 no-underline text-sky-600 hover:text-sky-500" href="#">아이디를 잊어버렸나요?</a>
                        <a className="text-[14px] no-underline my-4 text-sky-600 hover:text-sky-500" href="#">비밀번호를 잊어버렸나요?</a>
                        <button
                            className="rounded-[20px] border bg-sky-500 text-white hover:bg-sky-600  text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost:bg-transparent ghost:border-white">Sign
                            In
                        </button>
                    </form>
                </div>

                {/* 오버레이 컨테이너 */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* 오버레이 왼쪽 패널 */}
                        <div className="overlay-panel overlay-left">
                            <h1 className="font-bold text-black  m-0">Welcome Back!</h1>
                            <p className="text-[14px] text-black font-[100] leading-[20px] tracking-[0.5px] my-5 mb-7.5">반갑습니다. <br/> 이미 아이디가 있으신가요?</p>
                            <button
                                className="rounded-[20px] border bg-sky-500 text-white hover:bg-sky-600 text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none ghost active:scale-95 ghost:bg-transparent ghost:border-white"
                                id="signIn" onClick={handleSignInClick}>로그인하기
                            </button>
                        </div>
                        {/* 오버레이 오른쪽 패널 */}
                        <div className="overlay-panel overlay-right">
                            <h1  className="font-bold text-black  m-0">환영합니다!</h1>
                            <p className="text-[14px] text-black font-[100] leading-[20px] tracking-[0.5px] my-5 mb-7.5">아직 회원이 아니라면 <br/> 회원 가입 후 사이트를 이용해주세요.</p>
                            <button
                                className="rounded-[20px] border bg-sky-500 text-white hover:bg-sky-600 text-white text-[12px] font-bold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-80 ease-in cursor-pointer focus:outline-none active:scale-95 ghost ghost:bg-transparent ghost:border-white"
                                id="signUp" onClick={handleSignUpClick}>
                                회원가입하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 (필요에 따라 수정하세요) */}
            <footer className="bg-[#222] text-white text-sm fixed bottom-0 left-0 right-0 text-center z-[999]">
                <p className="my-2.5">© 2024 MediGom Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SignInSignUp;
