import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Login.css";
import Register from "../Register/Register";

const Login = ({ status, toggleStatus }) => {
  return (
    <>
      <div className={status.loginModal ? "login login--inactive" : "login"}>
        <div className="login__header">
          <BsArrowLeft
            className="login__back"
            onClick={() => toggleStatus("loginModal")}
          ></BsArrowLeft>
          <div
            className="login__home"
            onClick={() => toggleStatus("loginModal")}
          >
            <Link to="/">podo</Link>
          </div>
        </div>

        <div className="login__title">Login</div>
        <input className="login__id"></input>
        <input className="login__pw"></input>
        <div className="login__forgot">forgot email or password?</div>
        <div
          className="login__login"
          onClick={() => toggleStatus("loginModal")}
        >
          <Link to="/">login</Link>
        </div>
        <div
          className="login__register"
          onClick={() => toggleStatus("registerModal")}
        >
          register
        </div>
        {status.registerModal && (
          <Register status={status} toggleStatus={status} />
        )}
        <div className="login__sns">
          <div className="login__sns-msg">login with SNS</div>
          <div className="login__sns-cont">
            <button className="btn-social-login login__naver">
              <i className="xi-2x xi-naver"></i>
            </button>
            <button className="btn-social-login login__kakao">
              <i className="xi-2x xi-kakaotalk text-dark"></i>
            </button>
            <button className="btn-social-login login__facebook">
              <i className="xi-2x xi-facebook"></i>
            </button>
            <button className="btn-social-login login__google">
              <i className="xi-2x xi-google"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
