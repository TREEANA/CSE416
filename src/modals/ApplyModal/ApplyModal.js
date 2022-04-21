import React, { useState } from "react";
import { BsXLg, BsFilePlusFill } from "react-icons/bs";
import "./ApplyModal.css";
import SommHistory from "../../components/SommHistory/SommHistory";
{
  /* <img
className="becomesommlier_poto"
src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjJfMjA2/MDAxNTUzMjI3NDU5NzU0.MB7x7Bu9pbwOeZ_vXg11Q8MstK3C6MkAZ6UnhQ6ki0Yg.rOy-j6vpy3UbmWMEnBNo2LJLrV9lKzDUvMoeTGU-elAg.JPEG.onwinnersmd/2.jpg?type=w800"
></img> */
}
const ApplyModal = ({ applyModalStatus, toggleApplyModal }) => {
  const [step, setstep] = useState(0);
  const choose = () => {
    setstep(1);
  };

  const submit = () => {
    setstep(2);
  };

  const close = () => {
    setstep(0);
  };

  const gohistroy = () => {
    setstep(3);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const getPagebystep = () => {
    if (step === 0) {
      return (
        <div className="becomesommlier__section1">
          <div className="becomesommlier__create">
            {" "}
            <BsFilePlusFill
              className="becomesommlier__create__icon"
              onClick={choose}
            />{" "}
            Choose a photo of your sommlier certiticate to be verified{" "}
          </div>
          <div className="becomesommlier__history" onClick={gohistroy}>
            view request history
          </div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="becomesommlier__section2">
          <div className="becomesommlier_poto__container">
            {selectedImage && (
              <img
                className="becomesommlier_poto"
                alt="not fount"
                src={URL.createObjectURL(selectedImage)}
              />
            )}
            {!selectedImage && (
              <img
                className="becomesommlier_poto"
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjJfMjA2/MDAxNTUzMjI3NDU5NzU0.MB7x7Bu9pbwOeZ_vXg11Q8MstK3C6MkAZ6UnhQ6ki0Yg.rOy-j6vpy3UbmWMEnBNo2LJLrV9lKzDUvMoeTGU-elAg.JPEG.onwinnersmd/2.jpg?type=w800"
              />
            )}
            <input
              type="file"
              className="becomesommlier__add__poto"
              accept="image/*"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>

          <div className="becomesommlier__button" onClick={submit}>
            Submit
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="becomesommlier__section3">
          <div className="becomesommlier__section3_font" onClick={close}>
            Submission complete!<br></br>
            The rsult will be notified in 2-3 businness days
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="becomesommlier__section1">
          <div className="becomesommelier__title">
            <div className="becomesommlier__create">History</div>
            <div className="becomesommlier__history" onClick={close}>
              Back to apply
            </div>
          </div>

          <SommHistory num={2} />
          <SommHistory num={0} />
          <SommHistory num={0} />
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={
          applyModalStatus ? "becomesommlier" : "becomesommlier--inactive"
        }
      >
        <div className="becomesommlier__container">
          <div className="becomesommlier__header">
            <div className="becomesommlier__header__title">become sommlier</div>
            <BsXLg
              className="becomesommlier__top-close"
              onClick={() => {
                toggleApplyModal(), close(), setSelectedImage(null);
              }}
            />
          </div>
          <div className="becomesommlier_body">{getPagebystep()}</div>
        </div>
      </div>
    </>
  );
};

export default ApplyModal;
