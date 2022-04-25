import React, { useState } from "react";
import WineList from "../../components/WineList/WineList";
import Tag from "../../components/Tag/Tag";
import "./MainPage.css";

const MainPage = () => {
  const [list, setList] = useState({
    acidic: false,
    picnic: false,
    dry: false,
    oak: false,
    rose: false,
    cherry: false,
  });
  function onBtnClick() {
    setList({ ...list, [this.txt]: !list[this.txt] });
  }
  const displaySelectedTags = () => {
    const result = [];
    for (let each in list) {
      if (list[each] === true) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            isFilled={true}
            onClickIn={onBtnClick.bind({ txt: each })}
          />
        );
      }
    }
    return result;
  };
  const displayUnselectedTags = () => {
    const result = [];
    for (let each in list) {
      if (list[each] === false) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            onClickIn={onBtnClick.bind({ txt: each })}
          />
        );
      }
    }
    return result;
  };

  return (
    <>
      <main className="main">
        <WineList />
        <WineList />
        <WineList />
        {displaySelectedTags()}
        {displayUnselectedTags()}
      </main>
    </>
  );
};

export default MainPage;
