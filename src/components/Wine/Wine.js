import React, { useState } from "react";
import "./Wine.css";
import Tag from "../Tag/Tag";

const Wine = ({}) => {
  return (
    <div className="wine">
      <div className="wine__image">
        <img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"></img>
      </div>
      <div className="wine__detail">
        <div className="wine__title">La Crema Sonoma Coast Pinotasdf Noir</div>
        <div className="wine__tags">
          <Tag type="wineButton" isFilled={1} txt="picnic" />
          <Tag type="wineButton" isDisabled={1} txt="dry" />
          <Tag type="wineButton" isDisabled={1} txt="steak" />
          <Tag type="wineButton" isDisabled={1} txt="oak" />
          <Tag type="wineButton" isDisabled={1} txt="rose" />
          <Tag type="wineButton" isDisabled={1} txt="cherry" />
        </div>
        <div className="wine__rate">★4.5</div>
        <div className="wine__price">₩17,000</div>
      </div>
    </div>
  );
};

export default Wine;
