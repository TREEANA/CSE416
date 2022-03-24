import React, { useState } from "react";
import "./Filter.css";
import {BsSearch, BsXLg} from "react-icons/bs";

const Filter = () => {
    // State 이용해서 input 값 != "" 이면 X 보이게 하는걸로 할까여 
    // 그럼 x 클릭하면 onClick = {inputReset} 뭐 이런식으로 해야됨
    const onChange = () =>{

    }
    //range slider from Material-UI
    //https://mui.com/getting-started/installation/
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
  