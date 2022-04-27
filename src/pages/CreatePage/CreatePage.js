import React, { useState, useRef } from "react";
import Tag from "../../components/Tag/Tag";
import {
  BsXLg,
  BsSearch,
  BsPlus,
  BsPlusLg,
  BsFonts,
  BsX,
} from "react-icons/bs";
import axios, { CancelToken } from "axios";
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
  const source = useRef(null);
  const onWineSearchChange = async (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
    if (source.current !== null) {
      source.current.cancel();
    }
    source.current = CancelToken.source();
    try {
      if (e.target.value === "") {
        setWines([]);
      } else {
        const res = await axios.get(
          `api/wines/search?keyword=${e.target.value}`,
          {
            cancelToken: source.current.token,
          }
        );
        if (res.status === 200) {
          setWines(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
    const formattedTag = search.tag.toLowerCase();
    if (formattedTag !== "") {
      for (let each in tags) {
        if (each.indexOf(formattedTag) === 0 && tags[each] === false) {
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
  const displaySearchedWines = () => {
    return wines.map((each) => (
      <div className="create__select">
        <div className="create__wineImageCont">
          <img className="create__wineImage" src={each.images[0]} />
        </div>
        <div className="create__wineContent">
          <div className="create__winery">{each.winery}</div>
          <div className="create__name">{each.name}</div>
        </div>
        <div className="create__iconCont">
          <BsX className="create__wineDelete" />
          <BsFonts className="create__wineComment" />
        </div>
      </div>
    ));
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
            // onClick={debounce(searchWines)}
          />
          <input
            className="create__search"
            name="wine"
            placeholder="search a wine to add"
            value={search.wine}
            onChange={onWineSearchChange}
          ></input>
        </div>
        <div className="create__selectCont">{displaySearchedWines()}</div>

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
