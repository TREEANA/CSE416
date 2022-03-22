import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ loginModalStatus, toggleLoginModal }) => {
  return (
    <>
      <div className={loginModalStatus ? "login login--inactive" : "login"}>
        <div className="login__header">
          <BsArrowLeft
            className="login__back"
            onClick={toggleLoginModal}
          ></BsArrowLeft>
          <div className="login__home" onClick={toggleLoginModal}>
            <Link to="/">podo</Link>
          </div>
        </div>
        <div className="login__title">Login</div>
        <input className="login__id"></input>
        <input className="login__pw"></input>
        <div className="login__forgot">forgot email or password?</div>
        <div className="login__login" onClick={toggleLoginModal}>
          <Link to="/">login</Link>
        </div>
        <div className="login__register">register</div>
        <div className="login__sns">
          <div className="login__naver"></div>
          <div className="login__kakao"></div>
          <div className="login__facebook"></div>
          <div className="login__google"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
