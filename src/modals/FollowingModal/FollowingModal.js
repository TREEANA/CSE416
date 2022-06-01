import Loader from "../../components/Loader/Loader";
import { BsXLg } from "react-icons/bs";
import axios, { CancelToken } from "axios";
import { MdWineBar } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./FollowingModal.css";
import ReactPaginate from "react-paginate";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
const FollowingModal = ({ status, setStatus, userID, username }) => {
  const itemsPerPage = 5;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [followering, setFollowering] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(followering.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(followering.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % followering.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const fetchData = async () => {
    if (userID && userID !== -1) {
      console.log(userID);
      setLoading(true);
      const res = await axios.get(`/api/users/${userID}/followings`);
      setLoading(false);
      const newfollowings = res.data.followings;
      const newfollowingslist = [];

      for (let i = 0; i < newfollowings.length; i++) {
        const item = {
          userID: newfollowings[i].userID,
          username: newfollowings[i].username,
          profileImage: newfollowings[i].profileImage,
          status: newfollowings[i].status,
          isFollowing: true,
        };
        newfollowingslist.push(item);
      }

      setFollowering(newfollowingslist);
      setPageCount(Math.ceil(newfollowingslist.length / itemsPerPage));
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(newfollowingslist.slice(itemOffset, endOffset));
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

  const clickFollowingListButton = (id, followOption) => {
    const newArr = [];
    for (let i = 0; i < followering.length; i++) {
      const each = followering[i];
      if (each.userID === id) {
        each.isFollowing = !each.isFollowing;
        // if (!checkIDinuserList(each.userID)) {
        //   setUserList((oldArray) => [...oldArray, each]);
        // }
        // setFollowering(
        //   followering.filter((item) => item.userID !== each.userID)
        // );

        follow(id, followOption);
      }
      newArr.push(each);
    }
    setFollowering(newArr);
  };

  const displayfollowings22 = () => {
    const result = [];
    for (let i = 0; i < currentItems.length; i++) {
      const each = currentItems[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followingModal: !status.followingModal,
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
              each.isFollowing
                ? "search__button search__button"
                : "search__button--filled"
            }
            onClick={() => clickFollowingListButton(each.userID, "following")}
          >
            {each.isFollowing ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };

  const displayfollowings = () => {
    const result = [];
    for (let i = 0; i < followering.length; i++) {
      const each = followering[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followingModal: !status.followingModal,
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
              each.isFollowing
                ? "search__button search__button"
                : "search__button--filled"
            }
          >
            {each.isFollowing ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };

  useEffect(() => {
    fetchData();
  }, [status.followingModal]);

  return (
    <>
      {Number(status.userID) === Number(userID) ? (
        <>
          <div
            className={
              status.followingModal
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
                      followingModal: !status.followingModal,
                      filterApplyClicked: !status.filterApplyClicked,
                    });
                  }}
                />

                <div className="becomesommlier__header__title">
                  Your's Followings
                </div>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="becomesommlier_body">
                    {displayfollowings22()}
                  </div>
                  <div className="following__modal--page">
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
          <div
            className={
              status.followingModal
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
                      followingModal: !status.followingModal,
                    });
                  }}
                />

                <div className="becomesommlier__header__title">
                  {username}'s Followings
                </div>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="becomesommlier_body">
                    {displayfollowings()}
                  </div>
                  <div className="following__modal--page">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< pre"
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

export default FollowingModal;
