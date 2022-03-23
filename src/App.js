import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Review from "./components/Review/Review";

const App = () => {
  const [sidebarStatus, setSidebarStatus] = useState(0);
  const [loginModalStatus, setLoginModalStatus] = useState(0);
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const toggleLoginModal = () => {
    setLoginModalStatus(!loginModalStatus);
  };
=======

  const [userStatus, setUserStatus] = useState(0);
  // const setUserStatus = () =>{
  //   console.log("setUserStatus to : ", userStatus);
    
  // }


  return (
    <Router>
      <Sidebar
        sidebarStatus={sidebarStatus}
        toggleSidebar={toggleSidebar}
        toggleLoginModal={toggleLoginModal}
      ></Sidebar>
      <Login
        loginModalStatus={loginModalStatus}
        toggleLoginModal={toggleLoginModal}
      ></Login>
      <Header toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />


      <Review></Review>
    </Router>

    
  );
};

export default App;
