import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({authLogic}) => {

  const navigate = useNavigate();

  const moveHacker = (userId) => {
    window.localStorage.setItem("userId", userId)
    navigate({pathname:'/hackernews/'+userId})
  }
  const handleLogin = (e) => {
    // 로그인 성공 후 넘어온 정보 확인
    //authLogic.login("Google").then(console.log)
    authLogic.login("Google")
    .then(data => moveHacker(data.user.uid));
  }
  return (
    <>
      <h2>로그인 페이지</h2>
      <button onClick={handleLogin}>Google</button>
    </>
  );
};

export default LoginPage;
