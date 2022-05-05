import React, { useState } from "react";
import "./RegisterModal.css";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import RegisterTag from "../RegisterTagModal/RegisterTagModal";
import Tag from "../../components/Tag/Tag";

const RegisterModal = ({ status, toggleStatus }) => {
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
      {status.registerModal && (
        <div className="register">
          <div className="register__header">
            <BsArrowLeft
              className="register__back"
              onClick={() => toggleStatus("registerModal")}
            ></BsArrowLeft>
            <div className="register__home">
              <Link to="/" onClick={() => toggleStatus("registerModal")}>
                podo
              </Link>
            </div>
          </div>

          <div className="register__main">
            <div className="register__title">Register</div>

            <form className="register__main-content">
              <br></br>
              <div className="register_subtitle">choose your user name</div>
              <input className="register__name" placeholder="username"></input>
              <div className="register__name-warning"> available username </div>
              <br></br>
              <div className="register_subtitle">choose your photo</div>
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
              </div>
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

              <div
                className="register__register"
                onClick={() => {
                  toggleStatus("registerModal");
                }}
              >
                {" "}
                register
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
