import React, { useState } from "react";
import "./Filter.css";
import {BsSearch, BsXLg} from "react-icons/bs";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const Filter = () => {
    // State 이용해서 input 값 != "" 이면 X 보이게 하는걸로 할까여 
    // 그럼 x 클릭하면 onClick = {inputReset} 뭐 이런식으로 해야됨


    // const [value, setValue] = useState([]); //값
    // const [min, setMin] = useState();
    // const [max, setMax] = useState();

    // useEffect(() => {
    //     fetch("http://localhost:3000/data/data.json")
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
    const [valuePrice, setValuePrice] = useState([23, 58]);
    const [valueRate, setValueRate] = useState([3, 5.4]);

    const handlePriceChange = (event, newValue) => {
        setValuePrice(newValue);
        console.log("Price value : ", valuePrice)
    };

    const handleRateChange = (event, newValue) => {
        setValuePrice(newValue);
        console.log("Rate value : ", valueRate)
    };
    
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
            <div className = "filter">
                <div className = "filter__top">
                    <div className = "filter__top-title"> filters </div>
                    <BsXLg className = "filter__top-close"/>
                </div>

                <div className = "filter__cond">
                    <div className = "filter__cond-tag">
                        <div className = "filter__cond-title"> Tags </div>
                        <div className = "filter__cond-search"> 
                            <BsSearch className = "filter__cond-search-icon"/>
                            <input className = "filter__cond-search-input" placeholder = "search tags"></input>
                        </div>
                    </div>

                    <div className = "filter__cond-price">
                        <div className = "filter__cond-title"> Price </div>
                        <Box sx = {{width : "80%"}}>
                            <Slider className = "filter__cond-price-slider"
                                // getAriaLabel={() => 'wine price range'}
                                // aria-labelledby="range-slider"
                                value={valuePrice}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                // color = "primary"
                            />
                        </Box>
                    </div>

                    <div className = "filter__cond-rate">
                        <div className = "filter__cond-title"> Rating </div>
                        <Box sx = {{width : "80%"}}>
                            <Slider className = "filter__cond-price-slider"
                                // getAriaLabel={() => 'wine price range'}
                                // aria-labelledby="range-slider"
                                value={valueRate}
                                onChange={handleRateChange}
                                valueLabelDisplay="auto"
                                // color = "primary"
                            />
                        </Box>
                    </div>

                </div>
                
            </div>
        </>
        
    );
};
  
export default Filter;
  