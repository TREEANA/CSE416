
import React, { useState } from "react";
import { BsXLg,BsSearch,BsPlus,BsPlusLg,BsFonts,BsX} from "react-icons/bs";
import "./CreateWineList.css";

const CreateWineList = ({createWineListModalStatus,togglecreateWineListModal}) => {

return (
<>
    <div className={createWineListModalStatus ? "createWineList":"createWineList--inactive"}>
        <div className="becomesommlier__container">
            <div className="createWineList__header">
                <div className="createWineList__header__title">create a wine list</div>
                <BsXLg className = "createWineList__close" onClick = {togglecreateWineListModal}/>
            </div>

            <div className="createWineList__entertitle__container">
                <div className="createWineList__entertitle">Enter a title</div>
            </div>
            <div className="createWineList__search__container">
                <div className="createWineList__search__button">
                <BsSearch className="createWineList__cond-search-icon" />
                <input className="createWineList__cond-search-input"placeholder="search a wine to add"></input>
                </div>
            </div>
            <div className="createWineList_wine__container">
                <div className="createWineList_wine__box">
                    <div className="createWineList_wine__profile_box"><img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png" className="createWineList_wineImage"/></div>
                    <div className="createWineList_wine__description_box">
                        <div className="createWineList_wine__description_font">Matsu <br></br>El Viejo 2018</div>
                    </div>
                </div>
                <div className="createWineList_wine__icon_box">
                    <div className="createWineList_wine__icon"><BsFonts className="createWineList_wine__icon__text"/></div>
                    <div className="createWineList_wine__icon"><BsX className="createWineList_wine__icon__text"/></div>
                </div>
            </div>

            <div className="createWineList_wine__container">
                <div className="createWineList_wine__box">
                    <div className="createWineList_wine__profile_box"><img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png" className="createWineList_wineImage"/></div>
                    <div className="createWineList_wine__description_box">
                        <div className="createWineList_wine__description_font">Matsu <br></br>El Viejo 2018</div>
                    </div>
                </div>
                <div className="createWineList_wine__icon_box">
                    <div className="createWineList_wine__icon"><BsFonts className="createWineList_wine__icon__text"/></div>
                    <div className="createWineList_wine__icon"><BsX className="createWineList_wine__icon__text"/></div>
                </div>
            </div>

            <div className="createWineList_tag_container">
                <div className="createWineList__tag_button">
                    <input className="createWineList__tag-input"placeholder="add tags"></input>
                </div>
                <BsPlus className="createWineList__plus_icon"/>
            </div>
            <div className="createWineList__tag__items___container">
                <div className="createWineList__tags">
                    <div className="createWineList__tag"><BsX className="createWineList__tag__close_icon"/><div className="createWineList__tag__name_font">acidic</div></div>
                    <div className="createWineList__tag"><BsX className="createWineList__tag__close_icon"/><div className="createWineList__tag__name_font">light</div></div>
                    <div className="createWineList__tag"><BsX className="createWineList__tag__close_icon"/><div className="createWineList__tag__name_font">dry</div></div>
                    <div className="createWineList__tag"><BsX className="createWineList__tag__close_icon"/><div className="createWineList__tag__name_font">steak</div></div>
                    <div className="createWineList__tag"><BsX className="createWineList__tag__close_icon"/><div className="createWineList__tag__name_font">picnic</div></div>
                </div>
            </div>
            <div className="createWineList__comment__container">
                <div className="createWineList__comment__button"><div className="createWineList__comment__font">Great autumn wine. Clean leather, mint, cherry, blackberry and chocolate. Worth opening ahead of drinking -smooth and mellow</div></div>
            </div>
            <div className="createWineList_summit__container">
                <div className="createWineList__submit__button">submit</div>
            </div>


        </div>
    </div>
</>

);


};

<div className="createWineList__cond-search">
                    <BsSearch className="createWineList__cond-search-icon" />
                    <input
                        className="createWineList__cond-search-input"
                        placeholder="search tags"
                    ></input>
                    </div>
export default CreateWineList;

