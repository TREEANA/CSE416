import React, { useState } from "react";
import "./Register.css";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import RegisterTag from "../RegisterTag/RegisterTag";

const Register = ({ status, toggleStatus }) => {
  return (
    <>
      {status.registerModal && (
        <div className="register">
          <div className="register__header">
            <BsArrowLeft
              className="register__back"
              onClick={() => toggleStatus("registerModal")}
            ></BsArrowLeft>
            <div className="register__home">
              <Link to="/" onClick={() => toggleStatus("registerModal")}>
                podo
              </Link>
            </div>
          </div>

          <div className="register__main">
            <div className="register__title">Register</div>
            <form className="register__main-content">
              <input className="register__email" placeholder="email"></input>
              <input className="register__name" placeholder="username"></input>
              <div className="register__name-warning"> available username </div>

              <input
                className="register__pwd"
                placeholder="password"
                type="password"
              ></input>
              <input
                className="register__pwd2"
                placeholder="password"
                type="password"
              ></input>
              <div className="register__pwd-warning">
                Password does not match{" "}
              </div>
              <div
                className="register__register"
                onClick={() => {
                  toggleStatus("registerModal");
                  toggleStatus("registerTagModal");
                }}
              >
                register
              </div>
              {status.registerTagModal && (
                <RegisterTag
                  registerTagModalStatus={() =>
                    toggleStatus("registerTagModal")
                  }
                  toggleRegisterTagModal={() =>
                    toggleStatus("registerTagModal")
                  }
                />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
