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
import Ticket from "./components/Ticket/Ticket";
import WineListDetail from "./components/WineListDetail/WineListDetail";

const App = () => {
  const [sidebarStatus, setSidebarStatus] = useState(0);
  const [loginModalStatus, setLoginModalStatus] = useState(0);
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const toggleLoginModal = () => {
    setLoginModalStatus(!loginModalStatus);
  };

  const [ticketModalStatus, setTicketModalStatus] = useState(false);

  const toggleTicketModal = () => {
    setTicketModalStatus(!ticketModalStatus);
    console.log("Ticket modal , current sortpage: ", ticketModalStatus);
  };

  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const toggleSearchBar = () => {
    setSearchBarStatus(!searchBarStatus);
    console.log("searchBar toggle going on : ", searchBarStatus);
  };

  const [filterpage, setFilterpage] = useState(false);
  const togglefilterpage = () => {
    setFilterpage(!filterpage);
    console.log("filterPage toggled, current filterPageStatus: ", filterpage);
  };

  const [sortpage, setSortpage] = useState(false);
  const togglesortpage = () => {
    setSortpage(!sortpage);
    console.log("toggleSortPage, current sortpage: ", sortpage);
  };

  const [userstatus, setUserstatus] = useState(1);
  // general user, sommelier, admin (in order of 0,1,2)
  const setUser = (user) => {
    if (user == "general") {
      setUserstatus(0);
    } else if (user == "sommelier") {
      setUserstatus(1);
    } else if (user == "admin") {
      setUserstatus(2);
    }
  };

  return (
    <Router>
      <Sidebar
        sidebarStatus={sidebarStatus}
        toggleSidebar={toggleSidebar}
        toggleLoginModal={toggleLoginModal}
        toggleTicketModal={toggleTicketModal}
        userstatus={userstatus}
      ></Sidebar>
      <Ticket
        ticketModalStatus={ticketModalStatus}
        toggleTicketModal={toggleTicketModal}
      ></Ticket>
      <Login
        loginModalStatus={loginModalStatus}
        toggleLoginModal={toggleLoginModal}
      ></Login>
      <Search
        toggleSearchBar={toggleSearchBar}
        searchBarStatus={searchBarStatus}
      ></Search>

      <Header
        toggleSidebar={toggleSidebar}
        toggleSearchBar={toggleSearchBar}
        searchBarStatus={searchBarStatus}
      />
      <div className="article">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 여기서 페이지 구현할때 Route 하나씩 복사해서 일단 사용 */}
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/wineListDetail" element={<WineListDetail />} />
          {/* detail includes Review, Filter */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wineListPage" element={<WineListPage />} />
          <Route
            path="/winePage"
            element={
              <WinePage
                filterpage={filterpage}
                togglefilterpage={togglefilterpage}
                togglesortpage={togglesortpage}
                sortpage={sortpage}
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
