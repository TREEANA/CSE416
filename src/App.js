import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";

const App = () => {
  const [sidebarStatus, setSidebarStatus] = useState(0);
  const toggleSidebar = () => {
    console.log("toggleSidebar", sidebarStatus);
    setSidebarStatus(!sidebarStatus);
  };
  return (
    <Router>
      <Sidebar
        sidebarStatus={sidebarStatus}
        toggleSidebar={toggleSidebar}
      ></Sidebar>
      <Header toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
