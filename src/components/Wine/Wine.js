import React, { useState, useEffect } from "react";
import "./Wine.css";
import Tag from "../Tag/Tag";
import StarIcon from "@mui/icons-material/Star";

const wineDummyData = {
  windID: 1,
  tags: ["sweet", "dry", "oak", "cherry", "picnic", "rose"],
  name: "La Crema Sonoma Coast ",
  grape: "Pinot Noir",
  image: "https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png",
  lightness: 3.5,
  smoothness: 2.6,
  sweetness: 4.5,
  softness: 2.1,
  isDeleted: false,
  price: 43,
  rate: 2.5,
};

const Wine = ({ wine = { ...wineDummyData } }) => {
  const [tempWine, setTempWine] = useState(wine);

  return (
    <div className="wine">
      <div className="wine__image">
        <img src={tempWine.image}></img>
      </div>
      <div className="wine__detail">
        <div className="wine__nameTitle">{tempWine.name} </div>
        <div className="wine__grapeTitle">{tempWine.grape} </div>
        <div className="wine__tags">
          {tempWine.tags.slice(0, 5).map((tag, index) => (
            <Tag type="wineButton" txt={tag} key={index} />
          ))}
        </div>
        <div className="wine__rate">
          <StarIcon sx={{ fontSize: 40 }} />
          {tempWine.rate}
        </div>
        <div className="wine__price">
          {tempWine.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
    </div>
  );
};

export default Wine;
