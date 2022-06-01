import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBarModal.css";
import { BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import axios from "axios";

const SideBarModal = ({ status, toggleStatus, setStatus }) => {
  const onlogout = () => {
    let sessionStorage = window.sessionStorage;
    sessionStorage.removeItem("userinfo");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("accesstoken");
    sessionStorage.clear();
    location.reload();

    const userinfo = {
      followers: [],
      followings: [],
      likedWinelists: [],
      likedWines: [],
      profileImage: "",
      status: -1,
      tags: [],
      userID: -1,
      accesstoken: -1,
      username: "",
    };

    setStatus({
      ...status,
      sideBarModal: !status.sideBarModal,
      accesstoken: -1,
      userID: -1,
      user: -1,
      userinfo: userinfo,
    });
  };

  const onSuccess = async (response) => {
    const imageUrl = response.profileObj.imageUrl;
    const accesstoken = response.accessToken;
    try {
      const res = await axios.get(
        `/api/users/login?access_token=${accesstoken}`
      );
      if (res.status === 200) {
        if (res.data.userID === -1) {
          setStatus({
            ...status,
            accesstoken: accesstoken,
            registerModal: !status.registerModal,
            sideBarModal: !status.sideBarModal,
          });
        } else {
          const res1 = await axios.get(
            `/api/users/${res.data.userID}?requesterID=${res.data.userID}`
          );
          const userinfo = {
            followers: res1.data.followers,
            followings: res1.data.followings,
            likedWinelists: res1.data.likedWinelists,
            likedWines: res1.data.likedWines,
            profileImage: res1.data.profileImage,
            status: res1.data.status,
            tags: res1.data.tags,
            userID: res1.data.userID,
            accesstoken: accesstoken,
            username: res1.data.username,
          };
          setStatus({
            ...status,
            accesstoken: accesstoken,
            userID: res.data.userID,
            user: res1.data.status + 1,
            profileimage: imageUrl,
            userinfo: userinfo,
          });

          let sessionStorage = window.sessionStorage;
          sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
          sessionStorage.setItem("userID", res.data.userID);
          sessionStorage.setItem("accesstoken", accesstoken);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const displayUser = () => {
    if (status.userinfo.status === -1)
      return (
        <div className="sidebar__login">
          <div className="sidebar__header">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_LOGIN_API_KEY}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <div
                  className="sidebar__status"
                  onClick={() => {
                    renderProps.onClick();
                  }}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="sidebar__login__icon" />
                  Sign in with Google
                </div>
              )}
            />
            <BsXLg
              className="sidebar__close"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            />
          </div>

          {/* <div
            className="sidebar__register"
            onClick={() => {
              toggleStatus("sideBarModal", "registerModal");
            }}
          >
            don't have an account?
          </div> */}
        </div>
      );
    else if (status.userinfo.status === 0) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <Link to={`/profile/${status.userID}`}>
                <img
                  className="sidebar__profile__img"
                  src={status.userinfo.profileImage}
                />
              </Link>
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>{" "}
              </Link>
            </div>

            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
        </div>
      );
    } else if (status.userinfo.status === 1) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <Link to={`/profile/${status.userID}`}>
                <img
                  className="sidebar__profile__img"
                  src={status.userinfo.profileImage}
                />
              </Link>
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>{" "}
              </Link>
              <MdWineBar className="sidebar__icon" />
            </div>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
          <Link to="/create">
            <div
              className="sidebar__create"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <BsFillPlusCircleFill />
              create wine list
            </div>
          </Link>
          <hr className="sidebar__hr"></hr>
        </div>
      );
    } else if (status.userinfo.status === 2) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <Link to={`/profile/${status.userID}`}>
                <img
                  className="sidebar__profile__img"
                  src={status.userinfo.profileImage}
                />
              </Link>
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>{" "}
              </Link>
              <MdSettings className="sidebar__icon" />
            </div>

            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
        </div>
      );
    }
  };
  const displayFunction = () => {
    if (status.userinfo.status === -1) {
      return <></>;
    } else if (status.userinfo.status === 0) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => toggleStatus("sideBarModal", "applyModal")}
          >
            become sommlier
          </div>

          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketModal");
            }}
          >
            view tickets
          </div>

          <div
            className="sidebar__link"
            onClick={() => {
              onlogout();
            }}
          >
            log out
          </div>
        </>
      );
    } else if (status.userinfo.status === 1) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketModal");
            }}
          >
            view tickets
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              onlogout();
            }}
          >
            log out
          </div>
        </>
      );
    } else if (status.userinfo.status === 2) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal");
            }}
          >
            <Link to="/verifysomm">verify sommeliers</Link>
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal");
            }}
          >
            manage reviews
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketAdminModal");
            }}
          >
            manage tickets
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              onlogout();
            }}
          >
            log out
          </div>
        </>
      );
    }
  };

  const commonFuction = () => {
    return (
      <>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/profile">Profile</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/winePage">WinePage</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/winedetail">WinePage Detail</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/wineListPage">WineListPage</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/wineListDetail">WineListDetail</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal", "commentModal")}
        >
          Wine Detail Comment
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/Profile"> Profile</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => {
            toggleStatus("sideBarModal", "ticketModal");
          }}
        >
          view tickets
        </div>
        <div
          className="sidebar__link"
          onClick={() => {
            toggleStatus("sideBarModal", "applyModal");
          }}
        >
          become sommlier
        </div>
      </>
    );
  };
  return (
    <>
      <div
        className={
          status.sideBarModal ? "sidebar" : "sidebar sidebar--inactive"
        }
      >
        {displayUser()}
        <div className="sidebar__menu">
          <div className="sidebar__section">
            <Link to={`/lists/`}>
              <div
                className="sidebar__title"
                onClick={() => toggleStatus("sideBarModal")}
              >
                Wine Lists
              </div>
            </Link>
            <div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/picnic">Picnic</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/wedding">Wedding</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/party">Party</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/christmas">Christmas</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/business">Business</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/camping">Camping</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/travel">Travel</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/lists/date">Date</Link>
              </div>
            </div>
            <br></br>

            <Link to={`/wines/`}>
              <div
                className="sidebar__title"
                onClick={() => toggleStatus("sideBarModal")}
              >
                Wines
              </div>
            </Link>
            <div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/Red wine">Red</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/White wine">White</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/Sparkling wine">Sparkling</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/Rosé wine">Rose</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/Dessert wine"> Dessert</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/Fortified wine">Fortified</Link>
              </div>
            </div>
            {/* 여기서 페이지 구현할때 sidebar__link 하나씩 복사해서 일단 사용 */}

            {displayFunction()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarModal;
