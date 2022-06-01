import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import axios, { CancelToken } from "axios";
import Loader from "../../components/Loader/Loader";

// RegisterModal
const EditProfileModal = ({ status, toggleStatus, setStatus }) => {
  const [userName, setUserName] = useState("");
  const [isavailable, setAvailable] = useState(true);
  const [valueSearch, setSearch] = useState("");
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentname, setcurrentname] = useState("");

  const fetchTags = async () => {
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });

    // user가 선택한 태그 보여주기
    console.log(tempTags);
    if (status.userID) {
      const res = await axios.get(
        `/api/users/${status.userID}?requesterID=${status.userID}`
      );
      const usertag = res.data.tags;

      setcurrentname(res.data.username);
      setUserName(res.data.username);
      usertag.forEach((each) => {
        tempTags[each] = true;
      });
    }

    setList(tempTags);
  };

  useEffect(() => {
    fetchTags();
  }, [status.EditProfileModal]);

  function onBtnClick() {
    setList({ ...list, [this.txt]: !list[this.txt] });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const formattedTag = valueSearch.toLowerCase();
      const result = [];
      for (let each in list) {
        if (each.toLowerCase().indexOf(formattedTag) === 0) {
          result.push(each);
        }
      }
      if (result.length === 1) {
        setList({ ...list, [result[0]]: !list[result[0].length] });
      }
    }
  };

  const displaySelectedTags = () => {
    const result = [];

    for (let each in list) {
      if (list[each] === true) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            isFilled={true}
            onClick={onBtnClick.bind({ txt: each })}
          />
        );
      }
    }
    result.sort();
    return result;
  };

  const displayUnselectedTags = () => {
    const result = [];
    const formattedTag = valueSearch.toLowerCase();
    if (formattedTag !== "") {
      for (let each in list) {
        if (
          each.toLowerCase().indexOf(formattedTag) === 0 &&
          list[each] === false
        ) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    } else {
      for (let each in list) {
        if (list[each] === false) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    }
    return result;
  };

  const onNameChange = async (e) => {
    setUserName(e.target.value);
    try {
      const res = await axios.get(
        `/api/users/username-duplicate-check?username=${e.target.value}`
      );
      if (res.status === 200) {
        if (currentname === e.target.value) {
          setAvailable(true);
        } else {
          setAvailable(!res.data.duplicate);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditProfile = async () => {
    setLoading(true);
    let newtag = "";
    for (const each in list) {
      if (list[each] === true) {
        newtag = newtag.concat("tags=" + each + "&");
      }
    }
    newtag = newtag.slice(0, -1);

    const res = await axios.post(`/api/users/${status.userID}/tags?${newtag}`);
    console.log(`/api/users/${status.userID}/tags?${newtag}`);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${status.accesstoken}`
      );

      if (res.status === 200) {
        try {
          const res1 = await axios.put(`/api/users/${status.userID}`, {
            username: userName,
            email: res.data.email,
            profileImage: res.data.picture,
            phone: 0,
            gender: 1,
          });
          setLoading(false);
          console.log(res1);
        } catch (err) {
          console.log(err);
        }

        setStatus({
          ...status,
          editProfileModal: !status.editProfileModal,
          filterApplyClicked: !status.filterApplyClicked,
        });

        setSearch("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {status.editProfileModal && (
        <>
          {" "}
          {loading ? (
            <div className="register">
              <Loader />
            </div>
          ) : (
            <>
              <div className="register">
                <div className="register__header">
                  <BsArrowLeft
                    className="register__back"
                    onClick={() => toggleStatus("editProfileModal")}
                  ></BsArrowLeft>
                  <div className="register__home">
                    <Link
                      to="/"
                      onClick={() => toggleStatus("editProfileModal")}
                    >
                      podo
                    </Link>
                  </div>
                </div>

                <div className="register__main">
                  <div className="register__title">Edit your profile</div>

                  <form className="register__main-content">
                    <br></br>
                    <div className="register_subtitle">
                      Change your user name
                    </div>
                    <input
                      className="register__name"
                      placeholder="UserName"
                      value={userName}
                      onChange={(e) => {
                        onNameChange(e);
                      }}
                    ></input>
                    <div className="register__name-warning">
                      {isavailable
                        ? "available username"
                        : "unavailable username"}
                    </div>
                    <br></br>
                    <div className="register_subtitle">
                      {" "}
                      choose the tags you are interested{" "}
                    </div>

                    <div className="registertag__main-content">
                      <div className="registertag__main-search">
                        <BsSearch className="registertag__main-search-icon" />
                        <input
                          className="registertag__main-search-input"
                          placeholder="search for more tags"
                          onChange={(event) => {
                            setSearch(event.target.value);
                          }}
                          onKeyPress={handleKeyPress}
                        ></input>
                      </div>

                      <div>
                        {" "}
                        {displaySelectedTags()}
                        {displayUnselectedTags()}
                      </div>
                    </div>

                    {isavailable ? (
                      <div
                        className="register__register"
                        onClick={() => {
                          onEditProfile();
                        }}
                      >
                        {" "}
                        Edit profile
                      </div>
                    ) : (
                      <div className="register__register_unavailable">
                        {" "}
                        Edit profile
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EditProfileModal;
