import React from "react";
import "./WinePage.css";
import Wine from "../Wine/Wine";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";

const WinePage = ({
  filterModal,
  toggleFilterModal,
  toggleSortModal,
  sortModal,
}) => {
  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">search results for</div>
        <div className="winePage__title">Pinot Noir</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter" onClick={toggleFilterModal}>
          filter
        </button>
        <button className="winePage__sort" onClick={toggleSortModal}>
          sort
        </button>
      </div>
      <>
        {filterModal && (
          <Filter
            toggleFilterModal={toggleFilterModal}
            filterModal={filterModal}
          />
        )}
      </>

      <>
        {sortModal && (
          <Sort sortModal={sortModal} toggleSortModal={toggleSortModal} />
        )}
      </>
      <Wine />
      <Wine />
      <Wine />
    </div>
  );
};

export default WinePage;
