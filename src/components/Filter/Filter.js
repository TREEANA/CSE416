import React, { useState } from "react";
import "./Filter.css";
import {BsSearch, BsXLg} from "react-icons/bs";

const Filter = () => {
    return (
        <>
            <div className = "filter">
                <div className = "filter__top">
                    <div className = "filter__top-title"> filters </div>
                    <BsXLg className = "filter__top-close"/>
                </div>

                <div className = "filter__cond">
                    <div className = "filter__cond-tag">
                        <div className = "filter__cond-title"> Tags </div>
                        <div className = "filter__cond-search"> 
                            <BsSearch className = "filter__cond-search-icon"/>
                            <input className = "filter__cond-search-input" placeholder = "search tags"></input>
                        </div>
                    </div>

                    <div className = "filter__cond-price">
                        <div className = "filter__cond-title"> Price </div>
                    </div>

                    <div className = "filter__cond-rate">
                        <div className = "filter__cond-title"> Rating </div>
                    </div>

                </div>
            </div>
        </>
        
    );
};
  
export default Filter;
  