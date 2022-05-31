import React, { useState, useEffect } from "react";
import "./FilterModal.css";
import Tag from "../../components/Tag/Tag";
import { BsSearch, BsXLg, BsStarFill, BsStar } from "react-icons/bs";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import axios, { CancelToken } from "axios";

import { AlternateEmail } from "@mui/icons-material";
const FilterModal = ({ status, setStatus }) => {
  // tag명과 status를 key, value로 준 객체를 생성
  const [valuePrice, setValuePrice] = useState([23000, 128000]);
  const [valueRate, setValueRate] = useState(0);
  const [valueSearch, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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
  const fetchTags = async () => {
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });

    // 선택된 필터들
    const usertag = status.tagsForfilter;
    usertag.forEach((each) => {
      tempTags[each] = true;
    });

    setList(tempTags);
  };

  useEffect(() => {
    fetchTags();
    setValueRate(status.valueRate);
    setValuePrice(status.valuePrice);
  }, [status.tagsForfilter]);
  // 버튼을 클릭하면 토글되도록 변경
  function onBtnClick() {
    setList({ ...list, [this.txt]: !list[this.txt] });
  }
  // const clickAddIcon = () => {
  //   for (const each in list) {
  //     if (each === valueSearch) {
  //       const copylist = list;
  //       copylist[valueSearch] = true;
  //       setList(copylist);
  //     }
  //   }
  // };
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

  const handlePriceChange = (event, newValue) => {
    setValuePrice(newValue);
    console.log("Price value : ", valuePrice);
  };

  const handleRateChange = (event, newValue) => {
    setValueRate(newValue);
    console.log("Rate value : ", valueRate / 20);
  };

  const rate_marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },

    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  const price_marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 40000,
      label: "40000",
    },
    {
      value: 70000,
      label: "70000",
    },
    {
      value: 100000,
      label: "100000",
    },

    {
      value: 130000,
      label: "130000",
    },
    {
      value: 150000,
      label: "150000",
    },
  ];

  //discriminates number by 3 digits (with comma)
  const numberFormat = (num) => {
    if (num > 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  };

  //range slider from Material-UI
  //https://mui.com/getting-started/installation/

  return (
    <>
      <div className={status.filterModal ? "filter" : "filter--inactive"}>
        <div className="filter__top">
          <div className="filter__top-left">x</div>
          <div className="filter__top-title"> filters </div>
          <BsXLg
            className="filter__top-close"
            onClick={() => {
              let newselectedTags = [];

              for (let each in list) {
                if (list[each] === true) {
                  newselectedTags.push(each);
                }
              }
              setStatus({
                ...status,
                filterModal: !status.filterModal,
              });
            }}
          />
        </div>

        <div className="filter__cond">
          <div className="filter__cond-tag">
            <div className="filter__cond-title"> Tags </div>
            <div className="filter__cond-search">
              <BsSearch className="filter__cond-search-icon" />
              <input
                type="text"
                className="filter__cond-search-input"
                placeholder="search tags"
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
                // getAriaLabel={() => "wine price range"}
                // aria-labelledby="range-slider"
                value={valuePrice}
                onChange={handlePriceChange}
                marks={price_marks}
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
                // getAriaLabel={() => "wine rate range"}
                // aria-labelledby="range-slider"
                value={valueRate}
                track="inverted"
                onChange={handleRateChange}
                size="small"
                // aria-label = "rate-range-slider"
                marks={rate_marks}
                min={0}
                step={0.5}
                max={5}
                d
                // color = "primary"
              />
            </Box>
          </div>
        </div>
        <div className="filter__button">
          <div
            className="filter__button-apply"
            onClick={() => {
              let newselectedTags = [];

              for (let each in list) {
                if (list[each] === true) {
                  newselectedTags.push(each);
                }
              }
              setStatus({
                ...status,
                filterModal: !status.filterModal,
                tagsForfilter: newselectedTags,
                valuePrice,
                valueRate,
              });
            }}
          >
            apply filter
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
