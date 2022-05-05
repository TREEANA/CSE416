import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Tag from "../Tag/Tag";
import StarIcon from "@mui/icons-material/Star";

import "./Wine.css";

const wineDummyData = {
  windID: 1,
  tags: ["sweet", "dry", "oak", "cherry", "picnic", "rose"],
  name: "La Crema Sonoma Coast ",
  grape: "Pinot Noir",
  images: [
    "https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png",
  ],
  lightness: 3.5,
  smoothness: 2.6,
  sweetness: 4.5,
  softness: 2.1,
  isDeleted: false,
  price: 43,
  rating: 2.5,
};

const Wine = ({ wine = wineDummyData }) => {
  const formatPrice = () => {
    return (
      Math.round((wine.price * wine.exchangeRate) / 1000) * 1000
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "KRW",
    });
  };

  const formatGrape = () => {
    return wine.grape.map((each, index) => <div>{each}</div>);
  };

  return (
    <div className="wine">
      <div className="wine__image">
        <img src={wine.images[0]}></img>
      </div>
      <div className="wine__detail">
        <div className="wine__nameTitle">
          <Link to={`/wine/${wine.wineID}`}>{wine.name}</Link>
        </div>
        <div className="wine__grapeTitle">{formatGrape()}</div>
        <div className="wine__tags">
          {wine.tags.slice(0, 5).map((tag, index) => (
            <Tag type="wineButton" txt={tag} key={index} />
          ))}
        </div>
        <div className="wine__rate">
          <StarIcon sx={{ fontSize: 40 }} />
          {wine.rating}
        </div>
        <div className="wine__price">{formatPrice()}</div>
      </div>
    </div>
  );
};

export default Wine;
