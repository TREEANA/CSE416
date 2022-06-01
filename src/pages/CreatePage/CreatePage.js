import React, { useState, useRef, useEffect } from "react";
import axios, { CancelToken } from "axios";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import Tag from "../../components/Tag/Tag";
import { BsSearch, BsFonts, BsX } from "react-icons/bs";

import "./CreatePage.css";

const CreatePage = ({ status, toggleStatus }) => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState({
    title: "",
    tags: [],
    thumbnailImage: "",
    content: "",
    wines: [],
  });
  const [tags, setTags] = useState({});
  const [search, setSearch] = useState({
    wineKeyword: "",
    tagKeyword: "",
    wines: [],
  });
  const [tempImage, setTempImage] = useState("");
  const [tempFile, setTempFile] = useState(null);
  const [wineLoading, setWineLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchTags = async () => {
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });
    setTags(tempTags);
  };

  useEffect(async () => {
    setLoading(true);
    await fetchTags();
    setLoading(false);
  }, []);

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

  const onEachCommentChange = (e) => {
    const tempWines = newList.wines.slice();
    tempWines[e.target.id].sommelierComment = e.target.value;
    setNewList({
      ...newList,
      wines: tempWines,
    });
  };

  const onSearchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const source = useRef(null);
  const imageInput = useRef();

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
        setSearch({
          ...search,
          [e.target.name]: e.target.value,
          wines: [],
        });
      } else {
        setWineLoading(true);
        const res = await axios.get(
          `api/wines/search?keyword=${e.target.value}`,
          {
            cancelToken: source.current.token,
          }
        );
        setWineLoading(false);
        if (res.status === 200) {
          setSearch({
            ...search,
            [e.target.name]: e.target.value,
            wines: res.data,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchedWineClick = (wine) => (e) => {
    if (newList.wines.length >= 5) {
      alert("The maximum number of wines you can select is 5");
      return;
    }
    const tempWines = [...newList.wines];
    if (tempWines.find((each) => each.wineID === wine.wineID) !== undefined) {
      alert("The wine is already selected");
      return;
    }
    tempWines.push({ ...wine, sommelierComment: "" });
    console.log(tempWines);
    setNewList({
      ...newList,
      wines: tempWines,
    });
    setSearch({
      ...search,
      wineKeyword: "",
      wines: [],
    });
  };

  const checkWineComments = () => {
    let result = true;
    newList.wines.forEach((each) => {
      if (each.sommelierComment === "" || each.sommelierComment === undefined) {
        result = false;
      }
    });
    console.log("checkWineComments: ", result);
    return result;
  };

  const onSubmit = async () => {
    if (newList.title === "") {
      alert("Please enter title");
      return;
    } else if (tempFile == null) {
      alert("Please upload an image");
      return;
    } else if (newList.wines.length === 0) {
      alert("Please select wines");
      return;
    } else if (!checkWineComments()) {
      alert("Please comment on each wines");
      return;
    } else if (newList.tags.length === 0) {
      alert("Please select tags");
      return;
    } else if (newList.content === "") {
      alert("Please write description of the winelist");
      return;
    }
    setCreating(true);
    const body = {
      ...newList,
      userID: status.userID,
      wines: newList.wines.map((each) => {
        return { wineID: each.wineID, sommelierComment: each.sommelierComment };
      }),
    };
    const formData = new FormData();
    formData.append("api_key", process.env.REACT_APP_IMAGE_API_KEY);
    formData.append("upload_preset", process.env.REACT_APP_IMAGE_UPLOAD_PRESET);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    formData.append("file", tempFile);

    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };

    await axios.post("/external/image", formData, config).then((res) => {
      body.thumbnailImage = res.data.url;
    });

    console.log(body);

    await axios.post("/api/winelists", body).then((res) => {
      setCreating(false);
      navigate("/list/" + res.data.winelistID);
    });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTempImage(reader.result);
      setTempFile(e.target.files[0]);
    };
  };

  const onImgInputBtnClick = () => {
    imageInput.current.click();
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && search.tagKeyword !== "") {
      const formattedTag = search.tagKeyword.toLowerCase();
      let temp;
      for (let each in tags) {
        if (
          each.toLowerCase().indexOf(formattedTag) === 0 &&
          tags[each] === false
        ) {
          temp = each;
          break;
        }
      }
      if (temp === undefined) {
        return;
      }
      setTags({ ...tags, [temp]: true });
      setSearch({ ...search, tagKeyword: "" });
      const tempTags = newList.tags.slice();
      tempTags.push(temp);
      setNewList({ ...newList, tags: tempTags });
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
    const formattedTag = search.tagKeyword.toLowerCase();
    if (formattedTag !== "") {
      for (let each in tags) {
        if (
          each.toLowerCase().indexOf(formattedTag) === 0 &&
          tags[each] === false
        ) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onTagClick.bind({ txt: each })}
            />
          );
        }
      }
    } else {
      for (let each in tags) {
        if (!tags[each]) {
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
    return search.wines.map((each) => (
      <div
        className="create__searched"
        key={each.wineID}
        onClick={onSearchedWineClick(each)}
      >
        <div className="create__wineImageCont">
          <img className="create__wineImage" src={each.images[0]} />
        </div>
        <div className="create__wineContent">
          <div className="create__winery">{each.winery}</div>
          <div className="create__name">{each.name}</div>
        </div>
      </div>
    ));
  };

  const displaySelectedWines = () => {
    return newList.wines.map((each, index) => (
      <div className="create__select" key={each.wineID}>
        <div className="create__selectFirst">
          <div className="create__wineImageCont">
            <img className="create__wineImage" src={each.images[0]} />
          </div>
          <div className="create__wineContent">
            <div className="create__winery">{each.winery}</div>
            <div className="create__name">{each.name}</div>
          </div>
          <div className="create__iconCont">
            <BsX
              className="create__wineDelete"
              onClick={() => {
                setNewList({
                  ...newList,
                  wines: newList.wines.filter((each, i) => i !== index),
                });
              }}
            />
          </div>
        </div>
        <textarea
          className="create__each"
          placeholder="enter description of the wine"
          name="sommelierComment"
          value={each.sommelierComment}
          id={index}
          onChange={onEachCommentChange}
        />
      </div>
    ));
  };

  return (
    <>
      {loading || creating ? (
        <Loader />
      ) : status.userinfo.status === -1 ? (
        <div className="create__alert">
          Login as sommelier to create a winelist
        </div>
      ) : status.userinfo.status === 0 ? (
        <div className="create__alert">
          Get verified as sommelier to create a winelist
        </div>
      ) : (
        <div className="create">
          <div className="create__header">Create Winelist</div>

          <div className="create__subtitle">Title</div>
          <input
            className="create__title"
            type="text"
            name="title"
            placeholder="enter a title"
            value={newList.title}
            onChange={onChange}
          ></input>

          <div className="create__subtitle">Image</div>
          <input
            ref={imageInput}
            type="file"
            className="create__imageInput"
            accept="image/*"
            onChange={onImageChange}
          />
          <div
            className="create__uploadImage"
            onClick={onImgInputBtnClick}
            style={{ backgroundImage: `url(${tempImage})` }}
          >
            {tempImage === "" && <div className="create__uploadPlus">+</div>}
          </div>

          <div className="create__subtitle">Wines</div>
          <div className="create__selectCont">{displaySelectedWines()}</div>
          <div className="create__searchCont">
            <BsSearch className="create__searchIcon" />
            <input
              className="create__search"
              name="wineKeyword"
              placeholder="search a wine to add"
              value={search.wineKeyword}
              onChange={onWineSearchChange}
            ></input>
          </div>
          <div className="create__selectCont">
            {wineLoading ? <Loader /> : <>{displaySearchedWines()}</>}
          </div>

          <div className="create__subtitle">Tags</div>
          <div className="create__searchCont">
            <BsSearch className="create__searchIcon" />
            <input
              className="create__search"
              name="tagKeyword"
              placeholder="search tags"
              value={search.tagKeyword}
              onChange={onSearchChange}
              onKeyPress={onKeyPress}
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

          <div className="create__submit" onClick={onSubmit}>
            submit
          </div>
        </div>
      )}
    </>
  );
};
export default CreatePage;
