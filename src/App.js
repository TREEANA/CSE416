import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import LoginModal from "./modals/LoginModal/LoginModal";
import RegisterModal from "./modals/RegisterModal/RegisterModal";
import SideBarModal from "./modals/SideBarModal/SideBarModal";
import SearchBarModal from "./modals/SearchBarModal/SearchBarModal";
import ApplyModal from "./modals/ApplyModal/ApplyModal";
import TicketModal from "./modals/TicketModal/TicketModal";
import CreateModal from "./modals/CreateModal/CreateModal";
import CommentModal from "./modals/CommentModal/CommentModal";

import MainPage from "./pages/MainPage/MainPage";
import WinePage from "./pages/WinePage/WinePage";
import WineDetailPage from "./pages/WineDetailPage/WineDetailPage";
import ListPage from "./pages/ListPage/ListPage";
import ListDetailPage from "./pages/ListDetailPage/ListDetailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FaqPage from "./pages/FaqPage/FaqPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";

const App = () => {
  const [status, setStatus] = useState({
    user: 3,
    sideBarModal: false,
    searchBarModal: false,
    loginModal: false,
    registerModal: false,
    registerTagModal: false,
    ticketModal: false,
    filterModal: false,
    sortModal: false,
    createModal: false,
    applyModal: false,
    commentModal: false,
  });
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
      <SideBarModal status={status} toggleStatus={toggleStatus}></SideBarModal>
      <TicketModal
        ticketModalStatus={status.ticketModal}
        toggleTicketModal={() => toggleStatus("ticketModal")}
      ></TicketModal>
      <ApplyModal
        applyModalStatus={status.applyModal}
        toggleApplyModal={() => toggleStatus("applyModal")}
      ></ApplyModal>
      <CreateModal
        CreateModalStatus={status.createModal}
        toggleCreateModal={() => toggleStatus("createModal")}
      ></CreateModal>
      <CommentModal
        commentModalStatus={status.commentModal}
        togglecommentModal={() => toggleStatus("commentModal")}
      ></CommentModal>
      <LoginModal status={status} toggleStatus={toggleStatus}></LoginModal>
      <SearchBarModal
        searchBarModalStatus={status.searchBarModal}
        toggleSearchBarModal={() => toggleStatus("searchBarModal")}
      ></SearchBarModal>
      <RegisterModal
        status={status}
        toggleStatus={toggleStatus}
      ></RegisterModal>
      <Header status={status} toggleStatus={toggleStatus} />

      <div className="article">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/register"
            element={
              <RegisterModal status={status} toggleStatus={toggleStatus} />
            }
          />
          <Route path="/wineDetail" element={<WineDetailPage />} />
          <Route path="/listDetail" element={<ListDetailPage />} />
          {/* detail includes Review, Filter */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/list/*"
            element={<ListPage status={status} toggleStatus={toggleStatus} />}
          />

          <Route
            path="/winePage"
            element={
              <WinePage
                filterModal={status.filterModal}
                sortModal={status.sortModal}
                toggleFilterModal={() => toggleStatus("filterModal")}
                toggleSortModal={() => toggleStatus("sortModal")}
              />
            }
          />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="verifysomm" element={<VerifyPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
