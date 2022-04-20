import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchBarModal.css";
import { BsSearch, BsXLg } from "react-icons/bs";
import { MdWineBar } from "react-icons/md";

const SearchBarModal = ({ toggleSearchBarModal, searchBarModalStatus }) => {
  let location = useLocation();
  const [matchingWines, setMatchingWines] = useState([
    { wineID: 0, name: "Wine One" },
    { wineID: 1, name: "Wine Two" },
    { wineID: 2, name: "Wine Three" },
    { wineID: 3, name: "Wine Four" },
    { wineID: 4, name: "Wine Five" },
    { wineID: 5, name: "Wine Six" },
    { wineID: 6, name: "Wine Seven" },
  ]);
  const [matchingLists, setMatchingLists] = useState([
    { winelistID: 0, name: "List One" },
    { winelistID: 1, name: "List Two" },
    { winelistID: 2, name: "List Three" },
    { winelistID: 3, name: "List Four" },
    { winelistID: 4, name: "List Five" },
  ]);
  const [matchingPeople, setMatchingPeople] = useState([
    { userID: 0, name: "User 1" },
    { userID: 1, name: "User 2" },
    { userID: 2, name: "User 3" },
    { userID: 3, name: "User 4" },
    { userID: 4, name: "User 5" },
  ]);
  const displayMatchingWines = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];
      result.push(
        <div className="search__result-subtitle" id={each.wineID}>
          {each.name}
        </div>
      );
    }
    return result;
  };
  const displayMatchingLists = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 3; i++) {
      const each = arr[i];
      result.push(
        <div className="search__result-subtitle" id={each.winelistID}>
          {each.name}
        </div>
      );
    }
    return result;
  };
  const displayMatchingPeople = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];
      result.push(
        <div className="search__profile">
          <div className="search__image">
            <img />
          </div>
          <div className="search__name" id={each.userID}>
            {each.name}
          </div>
          <MdWineBar />
        </div>
      );
    }
    return result;
  };
  return (
    <>
      {location.pathname !== "/profile" ? (
        <div className={searchBarModalStatus ? "search" : "search--inactive"}>
          <div className="search__bar">
            <div className="search__textbar">
              <BsSearch className="search__text-icon" />
              <input
                className="search__text-input"
                placeholder="search wines and winelists"
              ></input>
            </div>
            <BsXLg className="search__close" onClick={toggleSearchBarModal} />
          </div>
          <div className="search__result">
            <div className="search__result-wine">
              <div className="search__result-title"> Explore Wines</div>
              {displayMatchingWines(matchingWines)}
            </div>

            <div className="search__result-winelist">
              <div className="search__result-title"> Explore Wine Lists</div>
              {displayMatchingLists(matchingLists)}
            </div>
          </div>
        </div>
      ) : (
        <div className={searchBarModalStatus ? "search" : "search--inactive"}>
          <div className="search__bar">
            <div className="search__textbar">
              <BsSearch className="search__text-icon" />
              <input
                className="search__text-input"
                placeholder="find new people"
              ></input>
            </div>
            <BsXLg className="search__close" onClick={toggleSearchBarModal} />
          </div>
          <div className="search__result">
            <div className="search__result-wine">
              {displayMatchingPeople(matchingPeople)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBarModal;
