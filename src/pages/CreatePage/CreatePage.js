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
  const [tags, setTags] = useState({
    // acidic: false,
    // picnic: false,
    // dry: false,
    // oak: false,
    // rose: false,
    // cherry: false,
  });
  const [search, setSearch] = useState({
    wineKeyword: "",
    tagKeyword: "",
    wines: [],
  });
  const [tempImage, setTempImage] = useState("");
  const [tempFile, setTempFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchTags = async () => {
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });
    setTags(tempTags);
  };

  useEffect(() => {
    fetchTags();
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
        setLoading(true);
        const res = await axios.get(
          `api/wines/search?keyword=${e.target.value}`,
          {
            cancelToken: source.current.token,
          }
        );
        setLoading(false);
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
    const tempWines = [...newList.wines];
    tempWines.push({ ...wine, sommelierComment: "" });
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

  const onSubmit = async () => {
    setCreating(true);
    const body = {
      ...newList,
      userID: status.userID,
      wines: newList.wines.map((each) => {
        return { wineID: each.wineID, sommelierComment: each.sommelierComment };
      }),
    };
    const formData = new FormData();
    formData.append("api_key", 673363115651154);
    formData.append("upload_preset", "ibgzg33i");
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
        result.push(
          <Tag
            type="selected"
            txt={each}
            onClick={onTagClick.bind({ txt: each })}
          />
        );
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
      {creating ? (
        <Loader />
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
            {loading ? <Loader /> : <>{displaySearchedWines()}</>}
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
