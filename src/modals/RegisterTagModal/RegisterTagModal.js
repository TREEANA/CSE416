import "./RegisterTagModal.css";
import React, { useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Tag from "../../components/Tag/Tag";

const RegisterTagModal = ({
  toggleRegisteTagModal,
  registerTagModalStatus,
}) => {
  return (
    <>
      <div className="registertag">
        <div className="registertag__header">
          <BsArrowLeft
            className="registertag__back"
            onClick={toggleRegisteTagModal}
          ></BsArrowLeft>
          <div className="registertag__home" onClick={toggleRegisteTagModal}>
            <Link to="/">podo</Link>
          </div>
        </div>

        <div className="registertag__main">
          <div className="registertag__title">Welcome to podo</div>
          <div className="registertag_subtitle">
            {" "}
            choose the tags you are interested in!{" "}
          </div>
          <div className="registertag__main-content">
            <div className="registertag__main-search">
              <BsSearch className="registertag__main-search-icon" />
              <input
                className="registertag__main-search-input"
                placeholder="search for more tags"
              ></input>
            </div>

            <div className="registertag__main-tag">
              <Tag isFilled={1} txt={"acidic"}></Tag>
              <Tag isFilled={0} txt={"light"}></Tag>
              <Tag isFilled={0} txt={"blackberry"}></Tag>
              <Tag isFilled={1} txt={"picnic"}></Tag>
              <Tag isFilled={0} txt={"chocolate"}></Tag>
              <Tag isFilled={1} txt={"oak"}></Tag>
              <Tag isFilled={0} txt={"vanilla"}></Tag>
              <Tag isFilled={0} txt={"plum"}></Tag>
              <Tag isFilled={1} txt={"jam"}></Tag>
              <Tag isFilled={1} txt={"good"}></Tag>
              <Tag isFilled={0} txt={"cherry"}></Tag>
              <Tag isFilled={0} txt={"red fruit"}></Tag>
              <Tag isFilled={0} txt={"strawberry"}></Tag>
              <Tag isFilled={0} txt={"fig"}></Tag>
              <Tag isFilled={0} txt={"cinnamon"}></Tag>
              <Tag isFilled={1} txt={"oriental"}></Tag>
              <Tag isFilled={0} txt={"leather"}></Tag>
              <Tag isFilled={1} txt={"earthy"}></Tag>
            </div>

            <div className="registertag__explore">
              <Link to="/">explore wines </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterTagModal;
