import React from "react";
import Wine from "../../components/Wine/Wine";
import Sort from "../../modals/SortModal/SortModal";
import Filter from "../../modals/FilterModal/FilterModal";
import WineList from "../../components/WineList/WineList";
import "./WinePage.css";

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
      <div className="winePage__btn">show more wines</div>
      <hr className="winePage__hr"></hr>
      <WineList />
      <WineList />
      <WineList />
      <div className="winePage__btn">show more wine lists</div>
    </div>
  );
};

export default WinePage;
