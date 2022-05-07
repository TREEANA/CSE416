import React, { useState } from "react";
import "./EditProfileModal.css";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import axios, { CancelToken } from "axios";
// RegisterModal
const EditProfileModal = ({ status, toggleStatus }) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [isavailable, setAvailable] = useState(false);
  const [selectedtag, setSelectedtag] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueSearch, setSearch] = useState("");
  const [list, setList] = useState({
    acidic: false,
    light: false,
    picnic: false,
    dry: false,
    oak: false,
    rose: false,
    cherry: false,
    blackberry: false,
    chocolate: false,
    vanilla: false,
    good: false,
    fruit: false,
    strawberry: false,
    fig: false,
  });
  // 버튼을 클릭하면 토글되도록 변경

  const onNameChange = async (e) => {
    try {
      const res = await axios.get(
        `/api/users/username-duplicate-check?username=${e.target.value}`
      );
      if (res.status === 200) {
        setAvailable(!res.data.duplicate);
        setUserName(e.target.value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditProfile = async () => {
    const newlist = [];
    for (const each in list) {
      if (list[each] === true) {
        newlist.push(each);
      }
    }
    setSelectedtag(newlist);

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
          console.log(res1);
          if (res1.status === 201) {
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  function onBtnClick() {
    setList({ ...list, [this.txt]: !list[this.txt] });
  }
  const clickAddIcon = () => {
    for (const each in list) {
      if (each === valueSearch) {
        const copylist = list;
        copylist[valueSearch] = true;
        setList(copylist);
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
    for (let each in list) {
      if (list[each] === false) {
        if (each.includes(valueSearch)) {
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

  return (
    <>
      {status.EditProfileModal && (
        <div className="register">
          <div className="register__header">
            <BsArrowLeft
              className="register__back"
              onClick={() => toggleStatus("EditProfileModal")}
            ></BsArrowLeft>
            <div className="register__home">
              <Link to="/" onClick={() => toggleStatus("EditProfileModal")}>
                podo
              </Link>
            </div>
          </div>

          <div className="register__main">
            <div className="register__title">Edit your profile</div>

            <form className="register__main-content">
              <br></br>
              <div className="register_subtitle">Change your user name</div>
              <input
                className="register__name"
                placeholder="username"
                onChange={onNameChange}
              ></input>
              <div className="register__name-warning">
                {isavailable ? "available username" : "unavailable username"}
              </div>
              <br></br>
              {/* <div className="register_subtitle">Change your photo</div>
              <div className="register__image__box__container">
                {selectedImage && (
                  <img
                    className="register__image__box"
                    alt="not fount"
                    src={URL.createObjectURL(selectedImage)}
                  />
                )}
                <input
                  type="file"
                  className="register__poto__file"
                  accept="image/*"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </div> */}
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
                  ></input>
                  <div className="register__Plus" onClick={clickAddIcon}>
                    {" "}
                    +
                  </div>
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
                    toggleStatus("EditProfileModal"), onEditProfile();
                  }}
                >
                  {" "}
                  register
                </div>
              ) : (
                <div className="register__register_unavailable"> register</div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
