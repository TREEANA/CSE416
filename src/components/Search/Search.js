import React, { useState } from "react";
import "./Search.css";
import {  BsSearch} from "react-icons/bs";

const Search = () => {
    return (
        <div className = "search"> 
            <div className = "search__bar">
                <div className = "search__textbar">
                    <BsSearch className = "search__text-icon"/>
                    <input className = "search__text-input" placeholder = "search"></input>
                </div>
                <span className="search__close" > x </span>
            </div>
        </div>
    );
  };
  
export default Search;
  