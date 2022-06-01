import Loader from "../../components/Loader/Loader";
import { BsXLg } from "react-icons/bs";
import axios, { CancelToken } from "axios";
import { MdWineBar } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./FollowsModal.css";
import ReactPaginate from "react-paginate";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
const FollowsModal = ({ status, setStatus, userID, username }) => {
  const itemsPerPage = 5;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(followers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(followers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % followers.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const fetchData = async () => {
    if (userID && userID !== -1) {
      console.log(userID);
      setLoading(true);
      const res = await axios.get(`/api/users/${userID}/followers`);
      setLoading(false);
      const newfollowers = res.data.followers;
      const newfollowerslist = [];
      for (let i = 0; i < newfollowers.length; i++) {
        const item = {
          userID: newfollowers[i].userID,
          username: newfollowers[i].username,
          profileImage: newfollowers[i].profileImage,
          status: newfollowers[i].status,
          isFollows: true,
        };
        newfollowerslist.push(item);
      }
      setFollowers(newfollowerslist);
      setPageCount(Math.ceil(newfollowerslist.length / itemsPerPage));
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(newfollowerslist.slice(itemOffset, endOffset));
    }
  };

  const follow = async (id, followOption) => {
    try {
      const res = await axios.post(
        `/api/users/${status.userID}/follow?targetUserID=${id}&followOption=${followOption}`
      );
      if (res.status === 200) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clickFollowsListButton = (id, followOption) => {
    const newArr = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      if (each.userID === id) {
        each.isFollows = !each.isFollows;

        follow(id, followOption);
      }
      newArr.push(each);
    }
    setFollowers(newArr);
  };

  const displayfollowers222 = () => {
    const result = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followsModal: !status.followsModal,
                });
              }}
            >
              <div className="search__image">
                <img className="search__image" src={each.profileImage} />
              </div>
              <div className="search__name" id={each.userID}>
                {each.username}
              </div>
              {each.status === 1 && <MdWineBar />}
            </div>
          </Link>

          <div
            className={
              each.isFollows
                ? "search__button search__button"
                : "search__button--filled"
            }
            onClick={() => clickFollowsListButton(each.userID, "follower")}
          >
            {each.isFollows ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };

  const displayfollowers = () => {
    const result = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followsModal: !status.followsModal,
                });
              }}
            >
              <div className="search__image">
                <img className="search__image" src={each.profileImage} />
              </div>
              <div className="search__name" id={each.userID}>
                {each.username}
              </div>
              {each.status === 1 && <MdWineBar />}
            </div>
          </Link>

          <div
            className={
              each.isFollows
                ? "search__button search__button"
                : "search__button--filled"
            }
          >
            {each.isFollows ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };
  useEffect(() => {
    fetchData();
  }, [status.followsModal]);

  return (
    <>
      {Number(status.userID) === Number(userID) ? (
        <>
          {" "}
          <div
            className={
              status.followsModal
                ? "becomesommlier"
                : "becomesommlier--inactive"
            }
          >
            <div className="becomesommlier__container">
              <div className="becomesommlier__header">
                <BsArrowLeft
                  className="becomesommlier__top-close"
                  onClick={() => {
                    setStatus({
                      ...status,
                      followsModal: !status.followsModal,
                      followersbackclick: !status.followersbackclick,
                    });
                  }}
                />
                <div className="becomesommlier__header__title">
                  Your's Followers
                </div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="becomesommlier_body">
                    {displayfollowers222()}
                  </div>
                  <div className="follows__modal--page">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< prev"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            className={
              status.followsModal
                ? "becomesommlier"
                : "becomesommlier--inactive"
            }
          >
            <div className="becomesommlier__container">
              <div className="becomesommlier__header">
                <BsArrowLeft
                  className="becomesommlier__top-close"
                  onClick={() => {
                    setStatus({
                      ...status,
                      followsModal: !status.followsModal,
                    });
                  }}
                />

                <div className="becomesommlier__header__title">
                  {username}'s Followers
                </div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="becomesommlier_body">
                    {displayfollowers()}
                  </div>
                  <div className="follows__modal--page">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< prev"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FollowsModal;
