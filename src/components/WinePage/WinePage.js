import React from "react";
import "./WinePage.css";
import Wine from "../Wine/Wine";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";

const WinePage = ({filterpage, togglefilterpage,togglesortpage,sortpage}) => {

  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">search results for</div>
        <div className="winePage__title">Pinot Noir</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter" onClick = {togglefilterpage}>filter</button>
        <button className="winePage__sort" onClick = {togglesortpage} > sort</button>
      </div>
      <>
        {filterpage && <Filter togglefilterpage = {togglefilterpage} filterpage = {filterpage}/>}
      </>

      <>
        {sortpage && <Sort sortpage = {sortpage} togglesortpage = {togglesortpage}/>}
      </>
      <Wine />
      <Wine />
      <Wine />
    </div>
  );
};

export default WinePage;
