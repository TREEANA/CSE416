import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Carousel.css";

const Carousel = ({ images, curPage, wines }) => {
  const displayPages = () => {
    const result = [];
    images.forEach((each, i) => {
      result.push(
        <div className="carousel__image">
          <Link to={"/wine/" + wines[i].wineID}>
            <img src={each} />
          </Link>
        </div>
      );
    });
    return result;
  };
  return (
    <>
      <div className={`carousel carousel--${curPage}`}>
        {displayPages(images)}
      </div>
    </>
  );
};

export default Carousel;
