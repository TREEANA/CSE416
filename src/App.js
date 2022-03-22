import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <Sidebar></Sidebar> */}
        <Routes>
          <Route path="/" exact component={Main} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
