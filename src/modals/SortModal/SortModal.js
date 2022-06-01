import "./SortModal.css";
import { BsSearch, BsXLg } from "react-icons/bs";
import React, { useState, useEffect } from "react";

const SortModal = ({ status, setStatus }) => {
  const [sortMethod, setSortMethod] = useState(0);

  useEffect(() => {
    setSortMethod(Number(status.sortOrder));
  }, [status.sortModal]);

  return (
    <>
      <div className={status.sortModal ? "sort" : "sort--inactive"}>
        <div className="sort__top">
          <div className="sort__top-left">x</div>
          <div className="sort__top-title"> Sort </div>
          <BsXLg
            className="sort__top-close"
            onClick={() =>
              setStatus({
                ...status,
                sortModal: !status.sortModal,
              })
            }
          />
        </div>

        <div className="sort__method">
          <div
            className={
              sortMethod === 0
                ? "sort__method--selected"
                : "sort__method--unselected"
            }
            onClick={() => {
              setSortMethod(0);
            }}
          >
            Highest Rating
          </div>
          <div
            className={
              sortMethod === 1
                ? "sort__method--selected"
                : "sort__method--unselected"
            }
            onClick={() => {
              setSortMethod(1);
            }}
          >
            Most Liked
          </div>
          <div
            className={
              sortMethod === 2
                ? "sort__method--selected"
                : "sort__method--unselected"
            }
            onClick={() => {
              setSortMethod(2);
            }}
          >
            Most reviewed
          </div>
          <div
            className={
              sortMethod === 3
                ? "sort__method--selected"
                : "sort__method--unselected"
            }
            onClick={() => {
              setSortMethod(3);
            }}
          >
            Price - Low to High
          </div>
          <div
            className={
              sortMethod === 4
                ? "sort__method--selected"
                : "sort__method--unselected"
            }
            onClick={() => {
              setSortMethod(4);
            }}
          >
            Price - High to Low
          </div>
        </div>
        <div className="filter__button">
          <div
            className="filter__button-apply"
            onClick={() => {
              setStatus({
                ...status,
                sortModal: !status.sortModal,
                sortOrder: sortMethod,
                filterApplyClicked: !status.filterApplyClicked,
              });
            }}
          >
            apply sort
          </div>
        </div>
      </div>
    </>
  );
};

export default SortModal;
