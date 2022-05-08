import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import Wine from "../../components/Wine/Wine";
import Loader from "../../components/Loader/Loader";
import SortModal from "../../modals/SortModal/SortModal";
import FilterModal from "../../modals/FilterModal/FilterModal";

import "./WinePage.css";

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

const WinePage = ({ status, toggleStatus }) => {
  const { theme } = useParams();

  const filterModal = status.filterModal;
  const sortModal = status.sortModal;
  const [wines, setWines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const toggleFilterModal = () => toggleStatus("filterModal");

  const toggleSortModal = () => toggleStatus("sortModal");

  const formatTheme = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchWines = async (tag, page) => {
    setLoading(true);
    try {
      const url = `/api/wines/search?tag=${tag}&num=${page * 10}`;
      console.log("Fetching wines: ", url);
      const res = await axios.get(url);
      setWines(res.data);
      console.log("Wines fetched: ", res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const displayWines = () => {
    const result = [];
    if (wines.length === 0) return;
    wines.forEach((each, index) => {
      wines.length - 1 == index
        ? result.push(
            <>
              <Wine
                wine={{
                  ...each,
                  exchangeRate: status.exchangeRate,
                }}
                key={index}
              />
              <div ref={ref}>{loading && <Loader />}</div>
            </>
          )
        : result.push(
            <Wine
              wine={{
                ...each,
                exchangeRate: status.exchangeRate,
              }}
              key={index}
            />
          );
    });
    return result;
  };

  useEffect(() => {
    fetchWines(theme, page);
  }, []);

  useEffect(() => {
    fetchWines(theme, page);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    setWines([]);
    setPage(1);
    fetchWines(theme, 1);
  }, [theme]);

  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">Wines</div>
        <div className="winePage__title">{formatTheme(theme)}</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter" onClick={toggleFilterModal}>
          filter
        </button>
        <button className="winePage__sort" onClick={toggleSortModal}>
          sort
        </button>
      </div>
      {loading && wines.length === 0 && <Loader />}
      {displayWines()}
      <FilterModal
        toggleFilterModal={toggleFilterModal}
        filterModal={filterModal}
      />
      <SortModal sortModal={sortModal} toggleSortModal={toggleSortModal} />
    </div>
  );
};

export default WinePage;
