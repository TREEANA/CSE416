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
import TicketAdminModal from "./modals/TicketAdminModal/TicketAdminModal";
import CommentPage from "./pages/CommentPage/CommentPage";
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
import FollowingModal from "./modals/FollowingModal/FollowingModal";
// import SommVerify from "./components/SommVerify/SommVerify";

const App = () => {
  let sessionStorage = window.sessionStorage;
  const userID = sessionStorage.getItem("userID");
  const accesstoken = sessionStorage.getItem("accesstoken");
  const [userinfo, setUserinfo] = useState({
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
  });

  const [status, setStatus] = useState({
    userinfo,
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
    ticketAdminModal: false,
    filterModal: false,
    followingModal: false,
    followsModal: false,
    sortModal: false,
    applyModal: false,
    exchangeRate: 1000,
    editProfileModal: false,
    sortOrder: 0,
    valuePrice: [23000, 128000],
    valueRate: 0,
    tagsForfilter: [],
  });

  useEffect(async () => {
    const res = await axios.get(`/api/users/${userID}?requesterID=${userID}`);
    setUserinfo(res.data);
  }, []);

  useEffect(() => {
    setStatus({
      ...status,
      userinfo,
    });
  }, [userinfo]);

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
        status={status}
        toggleStatus={toggleStatus}
        setStatus={setStatus}
        // toggleTicketModal={() => toggleStatus("ticketModal")}
      ></TicketModal>

      <TicketAdminModal
        status={status}
        toggleStatus={toggleStatus}
        setStatus={setStatus}
      ></TicketAdminModal>

      <ApplyModal
        status={status}
        applyModalStatus={status.applyModal}
        toggleApplyModal={() => toggleStatus("applyModal")}
      ></ApplyModal>

      {/* <CommentModal
        commentModalStatus={status.commentModal}
        togglecommentModal={() => toggleStatus("commentModal")}
      ></CommentModal> */}
      {/* <LoginModal status={status} toggleStatus={toggleStatus}></LoginModal>
       */}
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
        setStatus={setStatus}
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
          <Route
            path="/"
            element={<MainPage status={status} setStatus={setStatus} />}
          />
          {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
          {/* <Route path="/login" element={<LoginModal />} /> */}
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
            element={
              <WineDetailPage status={status} toggleStatus={toggleStatus} />
            }
          />
          <Route
            path="/list/:winelistID"
            element={<ListDetailPage status={status} setStatus={setStatus} />}
          />
          {/* detail includes Review, Filter */}
          <Route
            path="/profile/:userID"
            element={
              <ProfilePage
                status={status}
                toggleStatus={toggleStatus}
                setStatus={setStatus}
              />
            }
          />
          <Route
            path="/lists/:keyword"
            element={<ListPage status={status} toggleStatus={toggleStatus} />}
          />
          <Route
            path="/wines/:theme"
            element={
              <WinePage
                status={status}
                setStatus={setStatus}
                toggleStatus={toggleStatus}
              />
            }
          />
          <Route
            path="/search/:keyword"
            element={
              <SearchPage
                status={status}
                toggleStatus={toggleStatus}
                setStatus={setStatus}
              />
            }
          />
          <Route
            path="/create"
            element={<CreatePage status={status} toggleStatus={toggleStatus} />}
          />
          <Route
            path="/wine/:wineID/reviews/:reviewID"
            element={<CommentPage status={status} />}
          />

          <Route path="/faq" element={<FaqPage />} />
          <Route path="/verifysomm" element={<VerifyPage status={status} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
