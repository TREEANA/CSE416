import React from "react";
import WineList from "../../components/WineList/WineList";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
      <main className="main">
        <WineList />
        <WineList />
        <WineList />
      </main>
    </>
  );
};

export default MainPage;
