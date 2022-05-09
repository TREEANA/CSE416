import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import SortModal from "../../modals/SortModal/SortModal";
import FilterModal from "../../modals/FilterModal/FilterModal";

import "./SearchPage.css";

// const defaultWines = [
//   {
//     wineID: 0,
//     tags: ["picnic", "dry", "steak", "oak", "rose", "cherry"],
//     name: "Wine 1",
//     price: 17000,
//     rating: 4.5,
//   },
//   {
//     wineID: 1,
//     tags: ["picnic", "dry", "steak", "oak", "rose", "cherry"],
//     name: "Wine 2",
//     price: 17000,
//     rating: 4.5,
//   },
//   {
//     wineID: 2,
//     tags: ["picnic", "dry", "steak", "oak", "rose", "cherry"],
//     name: "Wine 3",
//     price: 17000,
//     rating: 4.5,
//   },
// ];
// const defaultLists = [
//   {
//     wineListID: 0,
//     userID: 0,
//     title: "Title 1",
//     images: [
//       "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//       "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
//       "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
//       "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
//     ],
//     content: "Content 1",
//     lastUpdatedAt: new Date(),
//   },
//   {
//     wineListID: 1,
//     userID: 1,
//     title: "Title 2",
//     images: [
//       "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//       "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
//       "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
//       "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
//     ],
//     content: "Content 2",
//     lastUpdatedAt: new Date(),
//   },
//   {
//     wineListID: 2,
//     userID: 2,
//     title: "Title 3",
//     images: [
//       "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//       "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
//       "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
//       "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
//     ],
//     content: "Content 3",
//     lastUpdatedAt: new Date(),
//   },
// ];

const SearchPage = ({ status, toggleStatus, setStatus }) => {
  const [wines, setWines] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { keyword } = useParams();
  const filterModal = status.filterModal;
  const sortModal = status.sortModal;
  const toggleFilterModal = () => toggleStatus("filterModal");
  const toggleSortModal = () => toggleStatus("sortModal");
  const fetchWines = async (keyword) => {
    try {
      const res = await axios.get(`/api/wines/search?keyword=${keyword}&num=5`);
      if (res.data === null || res.data === "") {
        setWines([]);
      } else {
        setWines(res.data);
      }
      console.log("fetched wines: ", res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchLists = async (keyword) => {
    try {
      const res = await axios.get(
        `/api/winelists/search?keyword=${keyword}&num=3`
      );
      if (res.data === null || res.data === "") {
        setLists([]);
        setAuthors([]);
      } else {
        setLists(res.data);
      }
      console.log("fetched lists: ", res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const displayWines = () => {
    const result = [];
    wines.forEach((each, i) => {
      result.push(
        <Wine wine={{ ...each, exchangeRate: status.exchangeRate }} />
      );
    });
    return result;
  };
  const displayLists = () => {
    const result = [];
    lists.forEach((each, i) => {
      result.push(
        <WineList wineList={each} status={status} setStatus={setStatus} />
      );
    });
    return result;
  };

  const formatKeyword = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(async () => {
    setLoading(true);
    await fetchWines(keyword);
    await fetchLists(keyword);
    setLoading(false);
  }, []);

  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">search results for</div>
        <div className="winePage__title">{formatKeyword(keyword)}</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter" onClick={toggleFilterModal}>
          filter
        </button>
        <button className="winePage__sort" onClick={toggleSortModal}>
          sort
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="winePage__subtitle">Wines</div>
          {wines.length === 0 && !loading ? (
            <>
              <div className="winePage__noMatchWines">No matching wines</div>
              <hr className="winePage__hr"></hr>
            </>
          ) : (
            <>
              {displayWines()}
              <Link to={"/wines/" + keyword}>
                <div className="winePage__btn">show more wines</div>
              </Link>
              <hr className="winePage__hr"></hr>
            </>
          )}
          <div className="winePage__subtitle">Winelists</div>
          {lists.length === 0 && !loading ? (
            <>
              <div className="winePage__noMatchLists">
                No matching winelists
              </div>
              <hr className="winePage__hr"></hr>
            </>
          ) : (
            <>
              {displayLists()}
              <Link to={"/lists/" + keyword}>
                <div className="winePage__btn">show more wine lists</div>
              </Link>
            </>
          )}
          <FilterModal
            toggleFilterModal={toggleFilterModal}
            filterModal={filterModal}
          />
          <SortModal sortModal={sortModal} toggleSortModal={toggleSortModal} />
        </>
      )}
    </div>
  );
};

export default SearchPage;
