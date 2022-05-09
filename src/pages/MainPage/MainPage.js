import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import WineList from "../../components/WineList/WineList";
import Loader from "../../components/Loader/Loader";

import "./MainPage.css";

const MainPage = () => {
  const [lists, setLists] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const fetchLists = async () => {
    try {
      const res = await axios.get(`/api/winelists/search?num=${page * 2}`);
      if (res.data === null || res.data === "") {
        setLists([]);
        setAuthors([]);
      } else {
        const temp = res.data;
        temp[0].images = [
          "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
        ];
        temp[1].images = [
          "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
          "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
        ];
        setLists(temp);
        const tempAuthors = [];
        for await (const each of temp) {
          const res = await axios.get(`/api/users/${each.userID}`);
          tempAuthors.push(res.data);
        }
        setAuthors(tempAuthors);
        console.log("fetched authors: ", tempAuthors);
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
      <main className="main">
        {loading && page === 1 ? (
          <Loader />
        ) : (
          <>
            {lists.map((each, i) => {
              return lists.length - 1 == i ? (
                <>
                  <WineList wineList={each} author={authors[i]} />
                  <div ref={ref}>{loading && <Loader />}</div>
                </>
              ) : (
                <WineList wineList={each} author={authors[i]} />
              );
            })}
          </>
        )}
      </main>
    </>
  );
};

export default MainPage;
