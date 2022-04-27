import React, { useState } from "react";
import Tag from "../../components/Tag/Tag";
import {
  BsXLg,
  BsSearch,
  BsPlus,
  BsPlusLg,
  BsFonts,
  BsX,
} from "react-icons/bs";
import axios from "axios";
import "./CreatePage.css";

const CreatePage = ({ status, toggleStatus }) => {
  const [newList, setNewList] = useState({
    title: "",
    thumbnailImage: "",
    tags: [],
    content: "",
  });
  const [tags, setTags] = useState({
    acidic: false,
    picnic: false,
    dry: false,
    oak: false,
    rose: false,
    cherry: false,
  });
  const [search, setSearch] = useState({
    wine: "",
    tag: "",
  });
  const [wines, setWines] = useState([]);
  function onTagClick() {
    const newTag = [];
    for (let each in tags) {
      if (tags[each] === true) {
        newTag.push(each);
      }
    }
    setTags({ ...tags, [this.txt]: !tags[this.txt] });
    setNewList({
      ...newList,
      tags: newTag,
    });
    setSearch({
      ...search,
      tag: "",
    });
  }
  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const searchWines = async () => {
    const temp = await axios.get("api/wines/search");
    console.log(temp.data);
    setWines(temp.data);
  };
  const onChange = (e) => {
    setNewList({
      ...newList,
      [e.target.name]: e.target.value,
    });
  };
  const onSearchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const displaySelectedTags = () => {
    const result = [];
    for (let each in tags) {
      if (tags[each] === true) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            isFilled={true}
            onClick={onTagClick.bind({ txt: each })}
          />
        );
      }
    }
    return result;
  };
  const displayUnselectedTags = () => {
    const result = [];
    if (search.tag !== "") {
      for (let each in tags) {
        if (each.indexOf(search.tag) === 0 && tags[each] === false) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onTagClick.bind({ txt: each })}
            />
          );
        }
      }
    }

    return result;
  };

  return (
    <>
      <div className="create">
        <div className="create__header">Create Winelist</div>

        <input
          className="create__title"
          type="text"
          name="title"
          placeholder="enter a title"
          value={newList.title}
          onChange={onChange}
        ></input>

        <div className="create__subtitle">Wines</div>
        <div className="create__searchCont">
          <BsSearch
            className="create__searchIcon"
            onClick={debounce(searchWines)}
          />
          <input
            className="create__search"
            name="wine"
            placeholder="search a wine to add"
            value={search.wine}
            onChange={onSearchChange}
          ></input>
        </div>
        <div className="create__selectCont">
          <div className="create__select">
            <div className="create_wine__box">
              <div className="create_wine__profile_box">
                <img
                  src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"
                  className="create_wineImage"
                />
              </div>
              <div className="create_wine__description_box">
                <div className="create_wine__description_font">
                  Matsu <br></br>El Viejo 2018
                </div>
              </div>
            </div>
            <div className="create_wine__icon_box">
              <div className="create_wine__icon">
                <BsFonts className="create_wine__icon__text" />
              </div>
              <div className="create_wine__icon">
                <BsX className="create_wine__icon__text" />
              </div>
            </div>
          </div>
          <div className="create__select">
            <div className="create_wine__box">
              <div className="create_wine__profile_box">
                <img
                  src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"
                  className="create_wineImage"
                />
              </div>
              <div className="create_wine__description_box">
                <div className="create_wine__description_font">
                  Matsu <br></br>El Viejo 2018
                </div>
              </div>
            </div>
            <div className="create_wine__icon_box">
              <div className="create_wine__icon">
                <BsFonts className="create_wine__icon__text" />
              </div>
              <div className="create_wine__icon">
                <BsX className="create_wine__icon__text" />
              </div>
            </div>
          </div>
        </div>

        <div className="create__subtitle">Tags</div>
        <div className="create__searchCont">
          <BsSearch className="create__searchIcon" />
          <input
            className="create__search"
            name="tag"
            placeholder="search tags"
            value={search.tag}
            onChange={onSearchChange}
          />
        </div>
        <div className="create__tag">
          {displaySelectedTags()}
          {displayUnselectedTags()}
        </div>

        <div className="create__subtitle">Description</div>
        <textarea
          className="create__comment"
          name="content"
          placeholder="enter description of your winelist"
          value={newList.content}
          onChange={onChange}
        />

        <div className="create__submit">submit</div>
      </div>
    </>
  );
};
export default CreatePage;
