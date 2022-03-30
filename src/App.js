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
import Profile from "./components/Profile/Profile";
import WinePage from "./components/WinePage/WinePage";
import WineListPage from "./components/WineListPage/WineListPage";
import FAQ from "./components/FAQ/FAQ";
import TicketModal from "./components/TicketModal/TicketModal";
import WineListDetail from "./components/WineListDetail/WineListDetail";
import Register from "./components/Register/Register";
import BecomeSommlier from "./components/BecomeSommlier/BecomeSommlier";

const App = () => {
  const [status, setStatus] = useState({
    becomeSommlierModal: false,
    user: 3,
    sideBar: false,
    searchBar: false,
    loginModal: false,
    registerModal: false,
    registerTagModal: false,
    ticketModal: false,
    filterModal: false,
    sortModal: false,
  });
  const handleStatus = (name, value) => {
    console.log(`handle${name}`);
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
      <Sidebar status={status} toggleStatus={toggleStatus}></Sidebar>
      <TicketModal
        ticketModalStatus={status.ticketModal}
        toggleTicketModal={() => toggleStatus("ticketModal")}
      ></TicketModal>
      <BecomeSommlier
        becomeSommlierModalStatus={status.becomeSommlierModal}
        togglebecomeSommlierModal={() => toggleStatus("becomeSommlierModal")}
      ></BecomeSommlier>
      <Login status={status} toggleStatus={toggleStatus}></Login>
      <Search
        searchBarStatus={status.searchBar}
        toggleSearchBar={() => toggleStatus("searchBar")}
      ></Search>
      <Header status={status} toggleStatus={toggleStatus} />

      <div className="article">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register status={status} toggleStatus={toggleStatus} />}
          />
          <Route path="/detail" element={<Detail />} />
          <Route path="/wineListDetail" element={<WineListDetail />} />
          {/* detail includes Review, Filter */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wineListPage" element={<WineListPage />} />
          <Route path="/wineListDetail" element={<wineListDetail />} />

          <Route
            path="/winePage"
            element={
              <WinePage
                filterModal={status.filterModal}
                toggleFilterModal={() => toggleStatus("filterModal")}
                toggleSortModal={() => toggleStatus("sortModal")}
                sortModal={status.sortModal}
              />
            }
          />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
