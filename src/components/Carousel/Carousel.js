import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images, curPage }) => {
  const displayPages = () => {
    const result = [];
    images.forEach((each, i) => {
      result.push(
        <div className="carousel__image">
          <img src={each} />
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
