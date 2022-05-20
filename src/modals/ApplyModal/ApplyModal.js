import React, { useState, useRef, useEffect } from "react";
import { BsXLg, BsFilePlusFill } from "react-icons/bs";
import "./ApplyModal.css";
import SommHistory from "../../components/SommHistory/SommHistory";
import axios, { CancelToken } from "axios";
{
  /* <img
className="becomesommlier_poto"
src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjJfMjA2/MDAxNTUzMjI3NDU5NzU0.MB7x7Bu9pbwOeZ_vXg11Q8MstK3C6MkAZ6UnhQ6ki0Yg.rOy-j6vpy3UbmWMEnBNo2LJLrV9lKzDUvMoeTGU-elAg.JPEG.onwinnersmd/2.jpg?type=w800"
></img> */
}
const ApplyModal = ({ status, applyModalStatus, toggleApplyModal }) => {
  const [step, setstep] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [tempFile, setTempFile] = useState(null);
  const imageInput = useRef();
  const [userHistory, setUserHistory] = useState([]);

  const fetchHistory = async () => {
    if (status.userID !== -1) {
      const res = await axios.get(
        `/api/verification-tickets?userID=${status.userID}`
      );
      console.log(res.data);
      setUserHistory();
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [status.userID]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTempImage(reader.result);
      setTempFile(e.target.files[0]);
    };
  };

  const onImgInputBtnClick = () => {
    imageInput.current.click();
  };

  const createverification = async () => {
    let body = {
      userID: status.userID,
      verificationImage:
        "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjJfMjA2/MDAxNTUzMjI3NDU5NzU0.MB7x7Bu9pbwOeZ_vXg11Q8MstK3C6MkAZ6UnhQ6ki0Yg.rOy-j6vpy3UbmWMEnBNo2LJLrV9lKzDUvMoeTGU-elAg.JPEG.onwinnersmd/2.jpg?type=w800",
      userExplanation: description,
    };

    const formData = new FormData();
    formData.append("api_key", 673363115651154);
    formData.append("upload_preset", "ibgzg33i");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    formData.append("file", tempFile);

    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };

    await axios.post("/external/image", formData, config).then((res) => {
      body.verificationImage = res.data.url;
    });

    // }
    try {
      await axios.post(`/api/verification-tickets`, body).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
    setDescription("");
    setTempImage("");
    setTempFile(null);
    setstep(2);
  };
  const choose = () => {
    setstep(1);
  };

  const submit = () => {
    setstep(4);
  };

  const result = () => {
    setstep(2);
  };

  const close = () => {
    setstep(0);
  };

  const gohistroy = () => {
    setstep(3);
  };

  const displayHistory = () => {
    const result = [];

    for (let each in userHistory) {
        result.push(
          <SommHistory data={each} />
        );
      
    }

    return result;
  };


  const getPagebystep = () => {
    if (step === 0) {
      return (
        <div className="becomesommlier__section1">
          <div className="becomesommlier__create">
            {" "}
            <BsFilePlusFill
              className="becomesommlier__create__icon"
              onClick={choose}
            />
            Choose a photo of your sommlier certiticate to be verified
          </div>
          <div className="becomesommlier__history" onClick={gohistroy}>
            view request history
          </div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="becomesommlier__section2">
          <div className="create__subtitle">Image</div>
          <input
            ref={imageInput}
            type="file"
            className="create__imageInput"
            accept="image/*"
            onChange={onImageChange}
          />
          <div
            className="create__uploadImage"
            onClick={onImgInputBtnClick}
            style={{ backgroundImage: `url(${tempImage})` }}
          >
            {tempImage === "" && <div className="create__uploadPlus">+</div>}
          </div>

          {/* <div className="becomesommlier__name">Uplode your certiticate</div>
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
          </div> */}

          {tempImage ? (
            <div className="becomesommlier__button" onClick={submit}>
              {" "}
              Next
            </div>
          ) : (
            <div className="becomesommlier__button_unavailable"> Next</div>
          )}
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="becomesommlier__section3">
          <div
            className="becomesommlier__section3_font"
            onClick={() => {
              close();
            }}
          >
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
    } else if (step === 4) {
      return (
        <div className="create">
          <div className="create__subtitle">Description</div>
          <textarea
            className="create__comment"
            name="content"
            placeholder="enter description of your winelist"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          {description !== "" ? (
            <div
              className="becomesommlier__button"
              onClick={() => {
                createverification();
              }}
            >
              {" "}
              Submit
            </div>
          ) : (
            <div className="becomesommlier__button_unavailable"> Submit</div>
          )}
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
                toggleApplyModal(), close(), setDescription("");
                setTempImage("");
                setTempFile(null);
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
