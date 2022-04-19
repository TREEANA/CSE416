import React, { useState } from "react";
import "./FilterModal.css";
import Tag from "../../components/Tag/Tag";
import { BsSearch, BsXLg, BsStarFill, BsStar } from "react-icons/bs";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const FilterModal = ({ filterModal, toggleFilterModal }) => {
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
  const [valuePrice, setValuePrice] = useState([23000, 128000]);
  const [valueRate, setValueRate] = useState(4.5);
  const [valueSearch, setSearch] = useState("");
  const [tagsItems, settagsItems] = useState(dummytaydata);
  const [selectedtagsItems, setselectedtagsItems] = useState([]);

  const clickTags = () => {
    const Result = selectedtagsItems;
    Result.push(valueSearch);
    setselectedtagsItems(Result);
  };

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

  const getSelectedTagItemsJSX = () => {
    return (
      <div>
        {selectedtagsItems.map((tag, index) => (
          <Tag isFilled={0} txt={tag} />
        ))}
      </div>
    );
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

  const handlePriceChange = (event, newValue) => {
    setValuePrice(newValue);
    console.log("Price value : ", valuePrice);
  };

  const handleRateChange = (event, newValue) => {
    setValueRate(newValue);
    console.log("Rate value : ", valueRate / 20);
  };

  //discriminates number by 3 digits (with comma)
  const numberFormat = (num) => {
    if (num > 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  };

  const seachtag = () => {
    if (dummytaydata.includes(valueSearch)) {
      console.log("hi");
      tagsResult.push(<Tag isFilled={0} txt={valueSearch} />);
    }
  };

  //range slider from Material-UI
  //https://mui.com/getting-started/installation/

  return (
    <>
      <div className={filterModal ? "filter" : "filter--inactive"}>
        <div className="filter__top">
          <div className="filter__top-left">x</div>
          <div className="filter__top-title"> filters </div>
          <BsXLg className="filter__top-close" onClick={toggleFilterModal} />
        </div>

        <div className="filter__cond">
          <div className="filter__cond-tag">
            <div className="filter__cond-title"> Tags </div>
            <div className="filter__cond-search">
              <BsSearch
                className="filter__cond-search-icon"
                onClick={clickSearchIcon}
              />
              <input
                type="text"
                className="filter__cond-search-input"
                placeholder="search tags"
                onChange={(event) => {
                  setSearch(event.target.value), findTag();
                }}
              ></input>
            </div>
            <div>{getTagItemsJSX()}</div>
          </div>

          {/* 와인리스트에 대해서는 이부분 없애야함 */}

          <div className="filter__cond-price">
            <div className="filter__cond-title"> Price </div>
            <div className="filter__cond-price-number">
              <div className="filter__cond-price-less">
                ₩{numberFormat(valuePrice[0])}
              </div>
              <div className="filter__cond-price-more">
                ₩{numberFormat(valuePrice[1])}{" "}
              </div>
            </div>
            <Box>
              <Slider
                className="filter__cond-price-slider"
                getAriaLabel={() => "wine price range"}
                // aria-labelledby="range-slider"
                value={valuePrice}
                onChange={handlePriceChange}
                size="small"
                min={0}
                max={150000}
                step={1000}
                // color = "primary"
              />
            </Box>
          </div>

          <div className="filter__cond-rate">
            <div className="filter__cond-title"> Rating </div>
            <div className="filter__cond-rate-number">
              <div className="filter__cond-rate-less"></div>
              <div className="filter__cond-rate-more">
                <BsStarFill />
                {valueRate}
              </div>
            </div>
            <Box>
              {/* sx = {{width : "80%"}} */}
              <Slider
                className="filter__cond-rate-slider"
                getAriaLabel={() => "wine rate range"}
                // aria-labelledby="range-slider"
                value={valueRate}
                onChange={handleRateChange}
                size="small"
                // aria-label = "rate-range-slider"
                min={0}
                step={0.1}
                max={5}
                // color = "primary"
              />
            </Box>
          </div>
        </div>
        <div className="filter__button">
          <div className="filter__button-apply" onClick={toggleFilterModal}>
            apply filter
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
