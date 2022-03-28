import React, { useState } from "react";
import "./Filter.css";
import Tag from "../Tag/Tag";
import { BsSearch, BsXLg, BsStarFill, BsStar } from "react-icons/bs";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const Filter = ({ filterModal, toggleFilterModal }) => {
  // State 이용해서 input 값 != "" 이면 X 보이게 하는걸로 할까여
  // 그럼 x 클릭하면 onClick = {inputReset} 뭐 이런식으로 해야됨

  // const [value, setValue] = useState([]); //값
  // const [min, setMin] = useState();
  // const [max, setMax] = useState();

  // useEffect(() => {
  //     fetch("url something")
  //     .then((res) => res.json())
  //     .then((res) => {
  //         // data 중 가격으로만 이루어진 새로운 배열 생성
  //         const price = res.data.map((data) => data.price);
  //         // 가격으로 이루어진 배열에서, 최대값과 최소값 구하기
  //         const max = price.reduce(function (pre, cur) {
  //         return pre > cur ? pre : cur;
  //         });
  //         const min = price.reduce(function (pre, cur) {
  //         return pre > cur ? cur : pre;
  //         });
  //         setData(res.data);
  //         // 최소값과 최대값으로 defaultValue 값 설정
  //         setValue([min, max]);
  //         setMin(min);
  //         setMax(max);
  //     });
  // },[]);

  const [valuePrice, setValuePrice] = useState([23000, 128000]);
  const [valueRate, setValueRate] = useState([3, 4.5]);

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
              <BsSearch className="filter__cond-search-icon" />
              <input
                className="filter__cond-search-input"
                placeholder="search tags"
              ></input>
            </div>
            <div>
              <Tag isFilled={0} txt="acidic" />
              <Tag isFilled={1} txt="light" />
              <Tag isFilled={1} txt="blackberry" />
              <Tag isFilled={0} txt="picnic" />
              <Tag isFilled={0} txt="chocolate" />
              <Tag isFilled={0} txt="oak" />
              <Tag isFilled={0} txt="vanilla" />
              <Tag isFilled={0} txt="plum" />
              <Tag isFilled={0} txt="jam" />
              <Tag isFilled={0} txt="good" />
              <Tag isFilled={0} txt="cherry" />
              <Tag isFilled={0} txt="red fruit" />
              <Tag isFilled={0} txt="strawberry" />
              <Tag isFilled={0} txt="fig" />
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
              <div className="filter__cond-rate-less">
                <BsStarFill />
                {valueRate[0]}
              </div>
              <div className="filter__cond-rate-more">
                <BsStarFill />
                {valueRate[1]}
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

export default Filter;
