import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSearch, BsXLg } from "react-icons/bs";
import { MdWineBar } from "react-icons/md";
import axios, { CancelToken } from "axios";

import Loader from "../../components/Loader/Loader";

import "./SearchBarModal.css";

const SearchBarModal = ({
  status,
  toggleSearchBarModal,
  searchBarModalStatus,
}) => {
  let location = useLocation();

  const [followers, setFollowers] = useState([]);
  const [followering, setFollowering] = useState([]);

  const getUserdata = async () => {
    if (status.userID) {
      let res = await axios.get(
        `/api/users/${status.userID}?requesterID=${status.userID}`
      );

      const newfollowingslist = res.data.followings;
      const newfollowerslist = res.data.followers;

      const adminId = 0;
      const userList = [];
      const followingUserList = [];
      const followUserList = [];

      res = await axios.get(`/api/users?userID=${adminId}&num=200&?page=2`);
      for (let i = 0; i < res.data.length; i++) {
        const each = res.data[i];
        let isFollowing = false;

        for (let i = 0; i < newfollowingslist.length; i++) {
          if (newfollowingslist[i] === each.userID) {
            isFollowing = true;
          }
        }
        let isFollows = false;

        for (let i = 0; i < newfollowerslist.length; i++) {
          if (newfollowerslist[i] === each.userID) {
            isFollows = true;
          }
        }
        const item = {
          userID: each.userID,
          username: each.username,
          profileImage: each.profileImage,
          status: each.status,
          isFollowing: isFollowing,
          isFollows: isFollows,
        };
        if (each.userID !== status.userID && !isFollowing && !isFollows) {
          userList.push(item);
        }
        if (isFollowing) {
          followingUserList.push(item);
        }
        if (isFollows) {
          followUserList.push(item);
        }
      }
      setUserList(userList);
      setFollowers(followUserList);
      setFollowering(followingUserList);
    }
  };

  const [userList, setUserList] = useState([]);

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

  const clickMatchingListButton = (id, followOption) => {
    const newArr = [];
    for (let i = 0; i < userList.length; i++) {
      const each = userList[i];
      if (each.userID === id) {
        each.isFollowing = !each.isFollowing;

        follow(id, followOption);
      }
      newArr.push(each);
    }
    setUserList(newArr);
  };

  const clickFollowsListButton = (id, followOption) => {
    const newArr = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      if (each.userID === id) {
        each.isFollowing = !each.isFollowing;

        follow(id, followOption);
      }
      newArr.push(each);
    }
    setFollowers(newArr);
  };

  const clickFollowingListButton = (id, followOption) => {
    const newArr = [];
    for (let i = 0; i < followering.length; i++) {
      const each = followering[i];
      if (each.userID === id) {
        each.isFollowing = !each.isFollowing;

        follow(id, followOption);
      }
      newArr.push(each);
    }
    setFollowering(newArr);
  };

  const displayMatchingPeople = () => {
    const result = [];
    if (valueSearch.length !== 0) {
      let newlistbysearch = [];
      for (let i = 0; i < userList.length; i++) {
        const each = userList[i];
        if (each.username.includes(valueSearch)) {
          newlistbysearch.push(each);
        }
      }
      for (let i = 0; i < newlistbysearch.length; i++) {
        const each = newlistbysearch[i];
        result.push(
          <div className="search__profile__container">
            <Link to={`/profile/${each.userID}`}>
              <div className="search__profile" onClick={toggleSearchBarModal}>
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
              onClick={() => follow(each.userID, "following")}
            >
              {each.isFollowing ? "following" : "follow"}
            </div>
          </div>
        );
      }
    } else {
      for (let i = 0; i < userList.length && i < 5; i++) {
        const each = userList[i];
        result.push(
          <div className="search__profile__container">
            <Link to={`/profile/${each.userID}`}>
              <div className="search__profile" onClick={toggleSearchBarModal}>
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
              onClick={() => clickMatchingListButton(each.userID, "following")}
            >
              {each.isFollowing ? "following" : "follow"}
            </div>
          </div>
        );
      }
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
            <div className="search__profile" onClick={toggleSearchBarModal}>
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
  const displayfollowers = () => {
    const result = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div className="search__profile" onClick={toggleSearchBarModal}>
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
                ? "search__button--filled"
                : "search__button search__button"
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

  const [clickFollowers, setClickFollowers] = useState(true);
  const [valueSearch, setSearch] = useState("");

  useEffect(() => {
    getUserdata();
  }, [status.searchBarModal]);

  // Woohyun's from here
  const [matchingWines, setMatchingWines] = useState([]);
  const [matchingLists, setMatchingLists] = useState([]);
  const [searchWines, setSearchWines] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const resWines = await axios.get(`/api/wines/search`);
    setMatchingWines(resWines.data);
    const resLists = await axios.get(`/api/winelists/search`);
    setMatchingLists(resLists.data);
    setLoading(false);
  }, []);
  const source = useRef(null);
  const onClose = () => {
    toggleSearchBarModal();
    setSearchWines("");
    setMatchingWines([]);
    setMatchingLists([]);
  };
  const onSearchChange = async (e) => {
    setSearchWines(e.target.value);
    if (source.current !== null) {
      source.current.cancel();
    }
    source.current = CancelToken.source();
    try {
      setLoading(true);
      console.log("fetching: ", `/api/wines/search?keyword=${e.target.value}`);
      const resWines = await axios.get(
        `/api/wines/search?keyword=${e.target.value}`,
        { cancelToken: source.current.token }
      );
      setMatchingWines(resWines.data);
      const resLists = await axios.get(
        `/api/winelists/search?keyword=${e.target.value}`,
        { cancelToken: source.current.token }
      );
      setMatchingLists(resLists.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const displayMatchingWines = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];
      result.push(
        <div
          className="search__result-subtitle"
          id={each.wineID}
          onClick={onClose}
        >
          <Link to={"/wine/" + each.wineID}>{each.name}</Link>
        </div>
      );
    }
    return result;
  };
  const displayMatchingLists = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 3; i++) {
      const each = arr[i];
      result.push(
        <div
          className="search__result-subtitle"
          id={each.winelistID}
          onClick={onClose}
        >
          <Link to={"/list/" + each.winelistID}>{each.title}</Link>
        </div>
      );
    }
    return result;
  };
  //Woohyun's to here

  return (
    <>
      {!location.pathname.includes("profile") ? (
        <div className={searchBarModalStatus ? "search" : "search--inactive"}>
          <div className="search__bar">
            <div className="search__textbar">
              <BsSearch className="search__text-icon" />
              <input
                className="search__text-input"
                placeholder="search wines and winelists"
                onChange={onSearchChange}
                value={searchWines}
              ></input>
            </div>
            <BsXLg className="search__close" onClick={onClose} />
          </div>
          <div className="search__result">
            <div className="search__result-wine">
              <div className="search__result-title"> Explore Wines</div>
              {loading ? (
                <Loader />
              ) : (
                <>{displayMatchingWines(matchingWines)}</>
              )}
            </div>

            <div className="search__result-winelist">
              <div className="search__result-title"> Explore Wine Lists</div>
              {loading ? (
                <Loader />
              ) : (
                <>{displayMatchingLists(matchingLists)}</>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={searchBarModalStatus ? "search" : "search--inactive"}>
          <div className="search__bar">
            <div className="search__textbar">
              <BsSearch className="search__text-icon" />
              <input
                className="search__text-input"
                placeholder="find new people"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>
            </div>
            <BsXLg className="search__close" onClick={toggleSearchBarModal} />
          </div>
          <div className="search__result">
            <div className="search__result-wine">
              {/* {displayMatchingPeople(matchingPeople)} */}
              {displayMatchingPeople()}

              <div className="search__header">
                <div
                  className={
                    clickFollowers
                      ? "search__header__selected"
                      : "search__header__unselected"
                  }
                  onClick={() => setClickFollowers(true)}
                >
                  Followers
                </div>
                <div
                  className={
                    clickFollowers
                      ? "search__header__unselected"
                      : "search__header__selected"
                  }
                  onClick={() => setClickFollowers(false)}
                >
                  Follows
                </div>
              </div>

              <div className="search__followers__font">
                {clickFollowers ? "Your Followers" : "You Following"}{" "}
              </div>

              {clickFollowers ? displayfollowers() : displayfollowings()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBarModal;
