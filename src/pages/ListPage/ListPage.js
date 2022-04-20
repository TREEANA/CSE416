import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WineList from "../../components/WineList/WineList";
import "./ListPage.css";

const defaultList = [
  {
    wineListID: 0,
    userID: 0,
    title: "Title 1",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 1",
    lastUpdatedAt: new Date(),
  },
  {
    wineListID: 1,
    userID: 1,
    title: "Title 2",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 2",
    lastUpdatedAt: new Date(),
  },
  {
    wineListID: 2,
    userID: 2,
    title: "Title 3",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 3",
    lastUpdatedAt: new Date(),
  },
];

const ListPage = ({ status, toggleStatus }) => {
  const location = useLocation();
  const theme = location.pathname.split("/")[2];
  const list = defaultList;
  const displayLists = () => {
    const result = [];
    list.forEach((each, i) => {
      result.push(<WineList wineList={each} />);
    });
    return result;
  };
  const formatTheme = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="wineListPage">
      <div className="wineListPage__titleCont">
        <div className="wineListPage__text">Wine Lists</div>
        <Link to={"list/picnic"}>
          <div className="wineListPage__title">{formatTheme(theme)}</div>
        </Link>
      </div>
      <div className="wineListPage__btnCont">
        <button
          className="wineListPage__filter"
          onClick={() => {
            toggleStatus("filterModal");
          }}
        >
          filter
        </button>
      </div>
      {displayLists()}
    </div>
  );
};

export default ListPage;
