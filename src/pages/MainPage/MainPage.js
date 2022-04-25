import React, { useState } from "react";
import WineList from "../../components/WineList/WineList";
import Tag from "../../components/Tag/Tag";
import "./MainPage.css";

const MainPage = () => {
  // tag명과 status를 key, value로 준 객체를 생성
  const [list, setList] = useState({
    acidic: false,
    picnic: false,
    dry: false,
    oak: false,
    rose: false,
    cherry: false,
  });
  // 버튼을 클릭하면 토글되도록 변경
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
            onClick={onBtnClick.bind({ txt: each })}
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
            onClick={onBtnClick.bind({ txt: each })}
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
        {/* 선택된 태그를 먼저 display하고 이후에 선택되지 않은 태그들을 display */}
        {displaySelectedTags()}
        {displayUnselectedTags()}
      </main>
    </>
  );
};

export default MainPage;
