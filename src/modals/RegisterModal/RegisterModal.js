import React, { useState } from "react";
import "./RegisterModal.css";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import RegisterTag from "../RegisterTagModal/RegisterTagModal";
import Tag from "../../components/Tag/Tag";

const RegisterModal = ({ status, toggleStatus }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dummytaydata = [
    "acidic",
    "light",
    "blackberry",
    "picnic",
    "chocolate",
    "oak",
    "vanilla",
    "good",
    "cherry",
    "red fruit",
    "strawberry",
    "fig",
  ];
  const [valueSearch, setSearch] = useState("");
  const [tagsItems, settagsItems] = useState(dummytaydata);
  const [selectedtagsItems, setselectedtagsItems] = useState([]);

  const clickSearchIcon = () => {
    if (
      dummytaydata.includes(valueSearch) &&
      !selectedtagsItems.includes(valueSearch)
    ) {
      const Result = [];
      for (let i = 0; i < selectedtagsItems.length; i++) {
        Result.push(selectedtagsItems[i]);
      }
      Result.push(valueSearch);
      setselectedtagsItems(Result);
      settagsItems([]);
    }
  };

  const getTagItemsJSX = () => {
    return (
      <div>
        {selectedtagsItems.map((tag, index) => (
          <Tag isFilled={0} txt={tag} />
        ))}
        {tagsItems.map((tag, index) => (
          <Tag isFilled={0} txt={tag} />
        ))}
      </div>
    );
  };

  const findTag = () => {
    const Result = [];

    for (let i = 0; i < dummytaydata.length; i++) {
      if (dummytaydata[i].includes(valueSearch)) {
        if (!selectedtagsItems.includes(dummytaydata[i])) {
          Result.push(dummytaydata[i]);
        }
      }
    }
    settagsItems(Result);
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
                  <BsSearch
                    onClick={clickSearchIcon}
                    className="registertag__main-search-icon"
                  />
                  <input
                    className="registertag__main-search-input"
                    placeholder="search for more tags"
                    onChange={(event) => {
                      setSearch(event.target.value), findTag();
                    }}
                  ></input>
                </div>

                <div>{getTagItemsJSX()}</div>
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
