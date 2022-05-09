import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import WineList from "../../components/WineList/WineList";
import Loader from "../../components/Loader/Loader";

import "./MainPage.css";

const MainPage = ({ status, setStatus }) => {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const fetchLists = async () => {
    try {
      const res = await axios.get(`/api/winelists/search?num=${page * 3}`);
      if (res.data === null || res.data === "") {
        setLists([]);
      } else {
        setLists(res.data);
      }
      console.log("fetched lists: ", res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await fetchLists();
    setLoading(false);
  }, []);

  useEffect(async () => {
    setLoading(true);
    await fetchLists();
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <>
      {loading && page === 1 ? (
        <Loader />
      ) : (
        <>
          <main className="main">
            {lists.map((each, i) => {
              return lists.length - 1 == i ? (
                <>
                  <WineList
                    wineList={each}
                    status={status}
                    setStatus={setStatus}
                  />
                  <div ref={ref}>{loading && <Loader />}</div>
                </>
              ) : (
                <WineList
                  wineList={each}
                  status={status}
                  setStatus={setStatus}
                />
              );
            })}
          </main>
        </>
      )}
    </>
  );
};

export default MainPage;
