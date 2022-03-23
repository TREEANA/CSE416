import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Review from "./components/Review/Review";
import Detail from "./components/Detail/Detail";
import Search from "./components/Search/Search";



const App = () => {
  const [sidebarStatus, setSidebarStatus] = useState(0);
  const [loginModalStatus, setLoginModalStatus] = useState(0);
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const toggleLoginModal = () => {
    setLoginModalStatus(!loginModalStatus);
  };

  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const toggleSearchBar = () =>{
    setSearchBarStatus(!searchBarStatus);
    console.log("searchBar toggle going on : ", {searchBarStatus});
  }



  const [userstatus, setUserstatus] = useState(1);
  // general user, sommelier, admin (in order of 0,1,2)
  const setUser= (user) =>{
    if (user == "general"){
      setUserstatus(0);
    }
    else if (user == "sommelier"){
      setUserstatus(1);
    }
    else if (user == "admin"){
      setUserstatus(2);
    }
  }




  return (
    <Router>
      <Sidebar
        sidebarStatus={sidebarStatus}
        toggleSidebar={toggleSidebar}
        toggleLoginModal={toggleLoginModal}
        userstatus= {userstatus}
      ></Sidebar>
      <Login
        loginModalStatus={loginModalStatus}
        toggleLoginModal={toggleLoginModal}
      ></Login>
      <Search 
      toggleSearchBar = {toggleSearchBar}
      searchBarStatus = {searchBarStatus} >

      </Search>


      <Header 
        toggleSidebar={toggleSidebar} 
        toggleSearchBar = {toggleSearchBar}
        searchBarStatus = {searchBarStatus} />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
