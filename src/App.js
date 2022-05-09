import "./App.css";
import React, { useState, useEffect, component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import LoginModal from "./modals/LoginModal/LoginModal";
import RegisterModal from "./modals/RegisterModal/RegisterModal";
import SideBarModal from "./modals/SideBarModal/SideBarModal";
import SearchBarModal from "./modals/SearchBarModal/SearchBarModal";
import ApplyModal from "./modals/ApplyModal/ApplyModal";
import TicketModal from "./modals/TicketModal/TicketModal";
import CommentModal from "./modals/CommentModal/CommentModal";
import EditProfileModal from "./modals/EditProfileModal/EditProfileModal";

import MainPage from "./pages/MainPage/MainPage";
import WinePage from "./pages/WinePage/WinePage";
import WineDetailPage from "./pages/WineDetailPage/WineDetailPage";
import ListPage from "./pages/ListPage/ListPage";
import ListDetailPage from "./pages/ListDetailPage/ListDetailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FaqPage from "./pages/FaqPage/FaqPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import CreatePage from "./pages/CreatePage/CreatePage";

// import SommVerify from "./components/SommVerify/SommVerify";

const App = () => {
  let sessionStorage = window.sessionStorage;
  let newuserinfo = {
    followers: [],
    followings: [],
    likedWinelists: [],
    likedWines: [],
    profileImage: "",
    status: -1,
    tags: [],
    userID: -1,
    accesstoken: -1,
    username: "",
  };
  const userinfo = JSON.parse(sessionStorage.getItem("userinfo"));

  if (userinfo) {
    newuserinfo = userinfo;
  }
  const userID = Number(sessionStorage.getItem("userID"));
  const accesstoken = sessionStorage.getItem("accesstoken");

  const [status, setStatus] = useState({
    userinfo: newuserinfo,
    user: 0,
    userID: userID,
    accesstoken: accesstoken,
    profileimage: "",
    sideBarModal: false,
    searchBarModal: false,
    loginModal: false,
    registerModal: false,
    registerTagModal: false,
    ticketModal: false,
    filterModal: false,
    sortModal: false,
    applyModal: false,
    commentModal: false,
    exchangeRate: 0,
    editProfileModal: false,
  });

  const fetchCurrency = async () => {
    try {
      const res = await axios.get("/external/currency");
      setStatus({
        ...status,
        exchangeRate: res.data.rates.KRW,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCurrency();
  }, []);
  const handleStatus = (name, value) => {
    setStatus({
      ...status,
      [name]: value,
    });
  };
  const toggleStatus = (...names) => {
    const result = { ...status };
    names.forEach((name) => {
      result[name] = !status[name];
    });
    setStatus(result);
  };

  return (
    <Router>
      <SideBarModal
        status={status}
        toggleStatus={toggleStatus}
        setStatus={setStatus}
      ></SideBarModal>
      <TicketModal
        ticketModalStatus={status.ticketModal}
        toggleTicketModal={() => toggleStatus("ticketModal")}
      ></TicketModal>
      <ApplyModal
        status={status}
        applyModalStatus={status.applyModal}
        toggleApplyModal={() => toggleStatus("applyModal")}
      ></ApplyModal>
      <CommentModal
        commentModalStatus={status.commentModal}
        togglecommentModal={() => toggleStatus("commentModal")}
      ></CommentModal>
      <LoginModal status={status} toggleStatus={toggleStatus}></LoginModal>
      <SearchBarModal
        status={status}
        searchBarModalStatus={status.searchBarModal}
        toggleSearchBarModal={() => toggleStatus("searchBarModal")}
      ></SearchBarModal>
      <RegisterModal
        status={status}
        setStatus={setStatus}
        toggleStatus={toggleStatus}
      ></RegisterModal>
      <EditProfileModal
        status={status}
        toggleStatus={toggleStatus}
      ></EditProfileModal>

      <div
        className={
          status.sideBarModal === true || status.searchBarModal === true
            ? "modalBackground"
            : ""
        }
        onClick={() => {
          setStatus({
            ...status,
            sideBarModal: false,
            searchBarModal: false,
          });
        }}
      ></div>

      <Header status={status} toggleStatus={toggleStatus} />

      <div className="article">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/register"
            element={
              <RegisterModal
                status={status}
                toggleStatus={toggleStatus}
                setStatus={setStatus}
              />
            }
          />
          <Route
            path="/wine/:wineID"
            element={<WineDetailPage status={status} />}
          />
          <Route
            path="/list/:winelistID"
            element={<ListDetailPage status={status} />}
          />
          {/* detail includes Review, Filter */}
          <Route
            path="/profile"
            element={
              <ProfilePage status={status} toggleStatus={toggleStatus} />
            }
          />
          <Route
            path="/profile/:userID"
            element={
              <ProfilePage status={status} toggleStatus={toggleStatus} />
            }
          />
          <Route
            path="/lists/:keyword"
            element={<ListPage status={status} toggleStatus={toggleStatus} />}
          />
          <Route
            path="/wines/:theme"
            element={<WinePage status={status} toggleStatus={toggleStatus} />}
          />
          <Route
            path="/search/:keyword"
            element={<SearchPage status={status} toggleStatus={toggleStatus} />}
          />
          <Route
            path="/create"
            element={<CreatePage status={status} toggleStatus={toggleStatus} />}
          />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/verifysomm" element={<VerifyPage />} />
          {/* <Route path="/verify" element={<SommVerify />}></Route> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
