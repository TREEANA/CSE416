import React from "react";
import "./WineListPage.css";
import WineList from "../WineList/WineList";

const WineListPage = ({}) => {
  return (
    <div className="wineListPage">
      <div className="wineListPage__titleCont">
        <div className="wineListPage__text">Wine Lists</div>
        <div className="wineListPage__title">Picnic</div>
      </div>
      <div className="wineListPage__btnCont">
        <button className="wineListPage__filter">filter</button>
      </div>
      <WineList />
      <WineList />
      <WineList />
    </div>
  );
};

export default WineListPage;
