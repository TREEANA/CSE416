import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchBarModal.css";
import { BsSearch, BsXLg } from "react-icons/bs";
import { MdWineBar } from "react-icons/md";
import axios from "axios";

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

  const [clickFollowers, setClickFollowers] = useState(true);
  const [valueSearch, setSearch] = useState("");
  const [matchingWines, setMatchingWines] = useState([
    { wineID: 0, name: "Wine One" },
    { wineID: 1, name: "Wine Two" },
    { wineID: 2, name: "Wine Three" },
    { wineID: 3, name: "Wine Four" },
    { wineID: 4, name: "Wine Five" },
    { wineID: 5, name: "Wine Six" },
    { wineID: 6, name: "Wine Seven" },
  ]);
  const [matchingLists, setMatchingLists] = useState([
    { winelistID: 0, name: "List One" },
    { winelistID: 1, name: "List Two" },
    { winelistID: 2, name: "List Three" },
    { winelistID: 3, name: "List Four" },
    { winelistID: 4, name: "List Five" },
  ]);
  const [matchingPeople, setMatchingPeople] = useState([
    { userID: 0, name: "User 1", follow: false },
    { userID: 1, name: "User 2", follow: false },
    { userID: 2, name: "User 3", follow: false },
    { userID: 3, name: "User 4", follow: false },
    { userID: 4, name: "User 5", follow: false },
  ]);

  const getMatchingUserdata = async (e) => {
    // 매칭할 유저 찾기
    const Followinglist = [];

    for (let i = 0; i < userData.followings.length && i < 3; i++) {
      const followinguserID = userData.followings[i];

      try {
        const res = await axios.get(
          `/api/users/${followinguserID}?requesterID=${followinguserID}`
        );
        if (res.status === 200) {
          const item = {
            userID: res.data.userID,
            username: res.data.username,
            follow: true,
            status: res.data.status + 1,
          };
          Followinglist.push(item);
        }
      } catch (e) {
        console.log(e);
      }
    }

    console.log(Followinglist);
    // setFollowering(Followinglist);
  };

  const follow = async (id, isfollow) => {
    try {
      const follow = "following";
      if (isfollow === false) {
        follow = "follower";
      }
      const res = await axios.get(
        `/api/users/${status.userID}/follow?targetUserID=${id}?followOption=${follow}`
      );
      if (res.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFollowingsdata = async () => {
    // 팔로잉 하고있는 유저 찾기
    const Followinglist = [];

    for (let i = 0; i < userData.followings.length && i < 3; i++) {
      const followinguserID = userData.followings[i];

      try {
        const res = await axios.get(
          `/api/users/${followinguserID}?requesterID=${followinguserID}`
        );
        if (res.status === 200) {
          const item = {
            userID: res.data.userID,
            username: res.data.username,
            follow: true,
            status: res.data.status + 1,
          };
          Followinglist.push(item);
        }
      } catch (e) {
        console.log(e);
      }
    }

    console.log(Followinglist);
    // setFollowering(Followinglist);
  };

  const getFollowsdata = async () => {
    // 나를 팔로우하는 유저 찾기
    const followerslist = [];

    for (let i = 0; i < userData.followers.length && i < 3; i++) {
      const followersuserID = userData.followers[i];

      try {
        const res = await axios.get(
          `/api/users/${followersuserID}?requesterID=${followersuserID}`
        );
        if (res.status === 200) {
          const item = {
            userID: res.data.userID,
            username: res.data.username,
            follow: true,
            status: res.data.status + 1,
          };
          followerslist.push(item);
        }
      } catch (e) {
        console.log(e);
      }
    }

    console.log(followerslist);
    // setFollowers(Followinglist);
  };

  useEffect(() => {
    getUserdata();
    getFollowingsdata();
    getFollowsdata();
  }, []);

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

  const clickMatchingListButton = (id) => {
    const newArr = [];
    for (let i = 0; i < matchingPeople.length; i++) {
      const each = matchingPeople[i];
      if (each.userID === id) {
        each.follow = !each.follow;
      }
      newArr.push(each);
    }

    setMatchingPeople(newArr);
  };

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

  const displayMatchingWines = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];
      result.push(
        <div className="search__result-subtitle" id={each.wineID}>
          {each.name}
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
        <div className="search__result-subtitle" id={each.winelistID}>
          {each.name}
        </div>
      );
    }
    return result;
  };
  const displayMatchingPeople = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length && i < 5; i++) {
      const each = arr[i];
      if (each.name.includes(valueSearch)) {
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
              onClick={() => clickMatchingListButton(each.userID)}
            >
              {each.follow ? "following" : "follow"}
            </div>
          </div>
        );
      }
    }
    return result;
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
              ></input>
            </div>
            <BsXLg className="search__close" onClick={toggleSearchBarModal} />
          </div>
          <div className="search__result">
            <div className="search__result-wine">
              <div className="search__result-title"> Explore Wines</div>
              {displayMatchingWines(matchingWines)}
            </div>

            <div className="search__result-winelist">
              <div className="search__result-title"> Explore Wine Lists</div>
              {displayMatchingLists(matchingLists)}
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
              {displayMatchingPeople(matchingPeople)}

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
                ? displayFollowers(followers)
                : displayFollowing(followering)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBarModal;
