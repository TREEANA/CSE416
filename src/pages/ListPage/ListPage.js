import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import WineList from "../../components/WineList/WineList";
import FilterModal from "../../modals/FilterModal/FilterModal";

import "./ListPage.css";

const defaultLists = [
  {
    wineListID: 0,
    userID: 0,
    title: "Title 1",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 1",
    lastUpdatedAt: "2022-05-09",
  },
  {
    wineListID: 1,
    userID: 1,
    title: "Title 2",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 2",
    lastUpdatedAt: "2022-05-09",
  },
  {
    wineListID: 2,
    userID: 2,
    title: "Title 3",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 3",
    lastUpdatedAt: "2022-05-09",
  },
];

const ListPage = ({ status, toggleStatus }) => {
  const { keyword } = useParams();
  const [lists, setLists] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const displayLists = () => {
    const result = [];
    lists.forEach((each, index) => {
      lists.length - 1 === index
        ? result.push(
            <>
              <WineList wineList={each} author={authors[index]} />
              <div ref={ref}>{loading && <Loader />}</div>
            </>
          )
        : result.push(<WineList wineList={each} author={authors[index]} />);
    });
    return result;
  };

  const fetchLists = async (keyword, page) => {
    try {
      const res = await axios.get(
        `/api/winelists/search?keyword=${keyword}&num=${page * 10}`
      );
      if (res.data === null || res.data === "") {
        setLists([]);
        setAuthors([]);
      } else {
        //이미지 불러올때까지만 임시코드
        const temp = res.data;
        temp.forEach((each) => {
          each.images = each.wines.map(
            (each) =>
              "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png"
          );
        });
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
    await fetchLists(keyword, page);
    setLoading(false);
  }, []);
  useEffect(async () => {
    setLoading(true);
    await fetchLists(keyword, page);
    setLoading(false);
  }, [page]);
  useEffect(() => {
    if (inView && !loading) {
      setPage(page + 1);
    }
  }, [inView]);
  useEffect(() => {
    setLists([]);
    setPage(1);
    fetchLists(keyword, 1);
  }, [keyword]);

  return (
    <>
      {loading && page === 1 ? (
        <Loader />
      ) : (
        <>
          <div className="wineListPage">
            <div className="wineListPage__titleCont">
              <div className="wineListPage__text">Wine Lists</div>
              <div className="wineListPage__title">{keyword}</div>
            </div>
            <div className="wineListPage__btnCont">
              <button
                className="wineListPage__filter"
                onClick={() => {
                  toggleStatus("filterModal");
                }}
              >
                filter
              </button>
            </div>
            {displayLists()}
          </div>
          <FilterModal
            filterModal={status.filterModal}
            toggleFilterModal={() => toggleStatus("filterModal")}
          />
        </>
      )}
    </>
  );
};

export default ListPage;
