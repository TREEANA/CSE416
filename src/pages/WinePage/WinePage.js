import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import Wine from "../../components/Wine/Wine";
import Loader from "../../components/Loader/Loader";
import SortModal from "../../modals/SortModal/SortModal";
import FilterModal from "../../modals/FilterModal/FilterModal";

import "./WinePage.css";

const WinePage = ({ status, toggleStatus, setStatus }) => {
  const filterModal = status.filterModal;
  const sortModal = status.sortModal;
  const { theme } = useParams();
  const [wines, setWines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const toggleFilterModal = () => toggleStatus("filterModal");

  const toggleSortModal = () => toggleStatus("sortModal");

  const formatTheme = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchFilterandSortDefault = () => {
    const newtags = [];
    newtags.push(theme);
    setStatus({
      ...status,
      sortOrder: "HighestRating",
      valuePrice: [23000, 128000],
      valueRate: 4.5,
      tagsForfilter: newtags,
    });
  };

  const fetchWines = async (page) => {
    setLoading(true);
    let newtag = "";

    for (let i = 0; i < status.tagsForfilter.length; i++) {
      newtag = newtag.concat("tags=" + status.tagsForfilter[i] + "&");
    }
    newtag = newtag.slice(0, -1);
    try {
      const url = `/api/wines/search?${newtag}&minPrice=${
        status.valuePrice[0]
      }&maxPrice=${status.valuePrice[1]}&minRating=${
        status.valueRate
      }&sort=0&num=${page * 10}`;
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
    fetchWines(page);
  }, []);

  useEffect(() => {
    fetchWines(page);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    setWines([]);
    setPage(1);
    fetchWines(1);
    fetchFilterandSortDefault();
  }, [theme]);

  useEffect(() => {
    fetchWines(1);
  }, [status.filterModal, status.sortModal]);

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
      <FilterModal status={status} setStatus={setStatus} />
      <SortModal status={status} setStatus={setStatus} />
    </div>
  );
};

export default WinePage;
