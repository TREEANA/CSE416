import React from "react";
import WineList from "../WineList/WineList";
import "./Main.css";

const Main = () => {
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

export default Main;
