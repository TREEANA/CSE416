import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { GrHomeRounded } from "react-icons/gr";
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
    let res;
    try {
      // console.log(status.userinfo.userID);
      if (status.userinfo.userID !== -1) {
        res = await axios.get(
          `/api/winelists/search?num=${page * 3}&userID=${
            status.userinfo.userID
          }`
        );
      } else {
        res = await axios.get(`/api/winelists/search?num=${page * 3}`);
      }
      if (res.data === null || res.data === "") {
        setLists([]);
      } else {
        setLists(res.data);
      }
      console.log("fetched lists: ", res.data);
    } catch (e) {
      console.log(e);
    }
    return res.data.length;
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
  }, [page, status.userinfo]);

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
            {lists.length === 0 ? (
              <>
                <div className="main__icon">
                  <GrHomeRounded />
                </div>
                <div className="main__title">Welcome to PODO</div>
                <div className="main__message">
                  Follow other users to see winelists <br />
                  that suits your taste!
                </div>
              </>
            ) : (
              lists.map((each, i) => {
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
              })
            )}
          </main>
        </>
      )}
    </>
  );
};

export default MainPage;
