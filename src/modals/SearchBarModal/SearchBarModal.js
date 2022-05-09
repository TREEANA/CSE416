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

  const [userData, setUserData] = useState({
    followings: [],
    followers: [],
  });

  const [followers, setFollowers] = useState([
    { userID: 0, name: "Follower 1", follow: true },
    { userID: 1, name: "Follower 2", follow: true },
    { userID: 2, name: "Follower 3", follow: true },
    { userID: 3, name: "Follower 4", follow: true },
    { userID: 4, name: "Follower 5", follow: true },
  ]);
  const [followering, setFollowering] = useState([
    { userID: 0, name: "Followering 1", follow: true },
    { userID: 1, name: "Followering 2", follow: true },
    { userID: 2, name: "Followering 3", follow: true },
    { userID: 3, name: "Followering 4", follow: true },
    { userID: 4, name: "Followering 5", follow: true },
  ]);

  const getUserdata = async () => {
    try {
      const res = await axios.get(
        `/api/users/${status.userID}?requesterID=${status.userID}`
      );
      if (res.status === 200) {
        setUserData({
          ...userData,
          followings: res.data.followings,
          followers: res.data.followers,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [userList, setUserList] = useState([]);

  const getAllUserList = async () => {
    // 매칭할 유저 찾기
    const adminId = 0;
    const userList = [];
    const followingUserList = [];
    const followUserList = [];

    try {
      const res = await axios.get(`/api/users?userID=${adminId}`);
      if (res.status === 200) {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const each = res.data[i];
          const followingslist = userData.followings;
          let isFollowing = false;

          for (let i = 0; i < followingslist.length; i++) {
            if (followingslist[i] === each.userID) {
              isFollowing = true;
            }
          }
          const followerslist = userData.followers;
          let isFollows = false;

          for (let i = 0; i < followerslist.length; i++) {
            if (followerslist[i] === each.userID) {
              isFollows = true;
            }
          }
          const item = {
            userID: each.userID,
            username: each.username,
            profileImage: each.profileImage,
            status: each.status + 1,
            isFollowing: isFollowing,
            isFollows: isFollows,
          };
          if (each.userID !== status.userId) {
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
    } catch (e) {
      console.log(e);
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

  const clickMatchingList2222Button = (id, followOption) => {
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

  const displayMatchingPeople2222 = () => {
    const result = [];
    for (let i = 0; i < userList.length && i < 5; i++) {
      const each = userList[i];
      if (
        each.username.includes(valueSearch) &&
        each.userID !== status.userID
      ) {
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
              onClick={() =>
                clickMatchingList2222Button(each.userID, "following")
              }
            >
              {each.isFollowing ? "following" : "follow"}
            </div>
          </div>
        );
      }
    }
    return result;
  };

  const displayfollowings2222 = () => {
    const result = [];
    for (let i = 0; i < followering.length && i < 5; i++) {
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
            onClick={() =>
              clickMatchingList2222Button(each.userID, "following")
            }
          >
            {each.isFollowing ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };
  const displayfollowers2222 = () => {
    const result = [];
    for (let i = 0; i < followers.length && i < 5; i++) {
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
                ? "search__button search__button"
                : "search__button--filled"
            }
            onClick={() => clickMatchingList2222Button(each.userID, "follower")}
          >
            {each.isFollowing ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };

  const [clickFollowers, setClickFollowers] = useState(true);
  const [valueSearch, setSearch] = useState("");
  const [matchingPeople, setMatchingPeople] = useState([
    { userID: 0, name: "User 1", follow: false },
    { userID: 1, name: "User 2", follow: false },
    { userID: 2, name: "User 3", follow: false },
    { userID: 3, name: "User 4", follow: false },
    { userID: 4, name: "User 5", follow: false },
  ]);

  useEffect(() => {
    getUserdata();
    getAllUserList();
  }, [status.userID]);

  const clickFollowersButton = (id) => {
    const newArr = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      if (each.userID === id) {
        each.follow = !each.follow;
      }
      newArr.push(each);
    }

    setFollowers(newArr);
  };

  const clickFollowsButton = (id) => {
    const newArr = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      if (each.userID === id) {
        each.follow = !each.follow;
      }
      newArr.push(each);
    }

    setFollowering(newArr);
  };
  const displayFollowers = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];

      result.push(
        <div className="search__profile__container">
          <div className="search__profile">
            <div className="search__image">
              <img />
            </div>
            <div className="search__name" id={each.userID}>
              {each.name}
            </div>
            <MdWineBar />
          </div>

          <div
            className={
              each.follow
                ? "search__button search__button"
                : "search__button--filled"
            }
            onClick={() => clickFollowersButton(each.userID)}
          >
            {each.follow ? "following" : "follow"}
          </div>
        </div>
      );
    }
    return result;
  };
  const displayFollowing = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];

      result.push(
        <div className="search__profile__container">
          <div className="search__profile">
            <div className="search__image">
              <img />
            </div>
            <div className="search__name" id={each.userID}>
              {each.name}
            </div>
            <MdWineBar />
          </div>

          <div
            className={
              each.follow
                ? "search__button search__button"
                : "search__button--filled"
            }
            onClick={() => clickFollowsButton(each.userID)}
          >
            {each.follow ? "following" : "follow"}
          </div>
        </div>
      );
    }
    return result;
  };

  // Woohyun's
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
              {displayMatchingPeople2222()}

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

              {clickFollowers
                ? displayfollowings2222()
                : displayfollowers2222()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBarModal;
