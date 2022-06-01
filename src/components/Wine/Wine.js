import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Tag from "../Tag/Tag";
import StarIcon from "@mui/icons-material/Star";

import "./Wine.css";

const wineDummyData = {
  wineID: 1,
  name: "Sauternes 1997",
  tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
  images: [
    "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_1997.png",
  ],
  lightness: 4.7,
  smoothness: 0,
  sweetness: 4.7,
  softness: 4.3,
  abv: 13.9,
  price: 574.97,
  region: ["France", "Bordeaux", "Sauternes"],
  bottleClosure: "",
  grape: ["Sauvignon Blanc", "Sémillon"],
  winery: "Château d'Yquem",
  description: "",
  foodPairings: ["Fruity desserts", "Blue cheese"],
  views: 361,
  likes: 0,
  isDeleted: true,
  createdAt: "2022-04-18 17:43",
  rating: 3.5,
  lastUpdatedAt: "2022-05-29 18:17:50",
  reviews: [
    {
      wineID: 1,
      reviewID: 2346,
      userID: 171,
      username: "testUser171",
      profileImage:
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/Archive/duck/duck_1.jpg",
      status: 0,
      rating: 3,
      content: "This is good wine by user171",
      isDeleted: false,
      createdAt: "2022-05-26 02:11:39",
      lastUpdatedAt: "2022-05-26 02:11:39",
      tags: ["blackberry", "Robust"],
      comments: [
        {
          commentID: 2099,
          userID: 0,
          content: "asdf",
          createdAt: "2022-05-27 02:54:51",
          lastUpdatedAt: "2022-05-27 02:54:51",
          isDeleted: false,
          username: "adminUser0",
          profileImage:
            "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/Archive/duck/duck_1.jpg",
          status: 2,
        },
        {
          commentID: 2100,
          userID: 0,
          content: "asdf",
          createdAt: "2022-05-27 03:03:42",
          lastUpdatedAt: "2022-05-27 03:03:42",
          isDeleted: false,
          username: "adminUser0",
          profileImage:
            "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/Archive/duck/duck_1.jpg",
          status: 2,
        },
        {
          commentID: 2101,
          userID: 0,
          content: "asdf",
          createdAt: "2022-05-27 03:03:42",
          lastUpdatedAt: "2022-05-27 03:03:42",
          isDeleted: false,
          username: "adminUser0",
          profileImage:
            "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/Archive/duck/duck_1.jpg",
          status: 2,
        },
        {
          commentID: 2102,
          userID: 60,
          content: "asefasef",
          createdAt: "2022-05-28 15:22:35",
          lastUpdatedAt: "2022-05-28 15:22:35",
          isDeleted: false,
          username: "zzaerynn",
          profileImage:
            "https://lh3.googleusercontent.com/a/AATXAJzXkApF-QzMa9EhwB8feAJZWP-lEaZFUVUMvg7g=s96-c",
          status: 1,
        },
      ],
      userLiked: false,
    },
    {
      wineID: 1,
      reviewID: 215,
      userID: 35,
      username: "Deleted User",
      profileImage: "",
      status: 0,
      rating: 4,
      content: "This is good wine by user35",
      isDeleted: false,
      createdAt: "2022-05-06 22:41:23",
      lastUpdatedAt: "2022-05-06 22:41:23",
      tags: [],
      comments: [
        {
          commentID: 1087,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1088,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1089,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1090,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1091,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1092,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1093,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
        {
          commentID: 1094,
          userID: 35,
          content: "Thank you for the helpful review35",
          createdAt: "2022-05-06 22:41:24",
          lastUpdatedAt: "2022-05-06 22:41:24",
          isDeleted: false,
          username: "Deleted User",
          profileImage: "",
          status: 0,
        },
      ],
      userLiked: false,
    },
  ],
  userLiked: false,
  recommendations: [
    {
      wineID: 14,
      name: "Sauternes 1996",
      tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
      images: [
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_1996.png",
      ],
      price: 574.97,
      grape: ["75% Sémillon", "22% Sauvignon Blanc", "3% Muscadelle"],
      rating: 0,
    },
    {
      wineID: 29,
      name: "Sauternes 2013",
      tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
      images: [
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_2013.png",
      ],
      price: 529.99,
      grape: ["Sauvignon Blanc", "Sémillon"],
      rating: 0,
    },
    {
      wineID: 32,
      name: "Sauternes 2000",
      tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
      images: [
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_2000.png",
      ],
      price: 574.97,
      grape: ["Sauvignon Blanc", "Sémillon"],
      rating: 0,
    },
    {
      wineID: 36,
      name: "Sauternes 2010",
      tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
      images: [
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_2010.png",
      ],
      price: 256.99,
      grape: ["87% Sémillon", "13% Sauvignon Blanc"],
      rating: 0,
    },
    {
      wineID: 37,
      name: "Sauternes 2014",
      tags: ["France", "Sauternes", "Château d'Yquem", "Dessert wine", "Blend"],
      images: [
        "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/wines/Sauternes_2014.png",
      ],
      price: 549,
      grape: ["Sauvignon Blanc", "Sémillon"],
      rating: 0,
    },
  ],
};

const Wine = ({ status, wine = wineDummyData }) => {
  const formatPrice = () => {
    return (
      Math.round((wine.price * status.exchangeRate) / 1000) * 1000
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
          {wine.rating.toFixed(1)}
        </div>
        <div className="wine__price">{formatPrice()}</div>
      </div>
    </div>
  );
};

export default Wine;
