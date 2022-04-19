import React, { useState } from "react";
import "./SearchBarModal.css";
import { BsSearch, BsXLg } from "react-icons/bs";

const SearchBarModal = ({ toggleSearchBarModal, searchModalBarStatus }) => {
  //onClick (search Icon on topnav) -> ToggleSearchbar
  // onChange = {onTextChange}
  // use State for inputs, and its placeholder (profile page 면 search other users )
  return (
    <>
      <div className={searchModalBarStatus ? "search" : "search--inactive"}>
        <div className="search__bar">
          <div className="search__textbar">
            <BsSearch className="search__text-icon" />
            <input className="search__text-input" placeholder="search"></input>
          </div>
          <BsXLg className="search__close" onClick={toggleSearchBarModal} />
        </div>
        <div className="search__result">
          {/* when input not empty */}
          <div className="search__result-wine">
            <div className="search__result-title"> Explore Wines</div>
            <div className="search__result-subtitle"> Meiomi Pinor Noir</div>
            <div className="search__result-subtitle">
              La Crema Sonoma Coast Pinor Noir
            </div>
            <div className="search__result-subtitle">
              Louis jadot Bourgongne PInor Noir
            </div>
            <div className="search__result-subtitle"> Erath Pinor Noir</div>
            <div className="search__result-subtitle">
              Bread & Butter Pinot Noir
            </div>
          </div>

          <div className="search__result-winelist">
            <div className="search__result-title"> Explore Wine Lists</div>
            <div className="search__result-subtitle">
              Elegance of Pinor Noir by Eddie Osterland
            </div>
            <div className="search__result-subtitle">
              Everything You need to know about Pinot Noir
            </div>
            <div className="search__result-subtitle">
              "Pinot Noir", The Holy Grail of Winer
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBarModal;
