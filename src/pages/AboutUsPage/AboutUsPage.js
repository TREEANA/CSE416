import "./AboutUsPage.css";
import React, { useState, useEffect } from "react";

import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

import profileDKE from "../../images/profileDKE.png";
import profileWHP from "../../images/profileWHP.jpg";
import profileWHL from "../../images/profileWHL.jpg";
import profileHRC from "../../images/profileHRC.jpg";

const AboutUsPage = () => {
  const [contentStatus, setContentStatus] = useState({
    problem: false,
    target: false,
    solution: false,
  });

  const toggleContent = (...name) => {
    const result = { ...contentStatus };
    result[name] = !contentStatus[name];
    setContentStatus(result);
  };

  return (
    <>
      <div className="about">
        <div className="about__pageTitle"> About Us</div>
        <div className="about__intro">
          <div className="about__problem">
            <div
              className="about__title"
              name="problem"
              // onClick={toggleContent("problem")}
            >
              Problem
            </div>
            <hr className="about__hr" />
            <div
              // className={
              //   contentStatus.problem
              //     ? "about__content"
              //     : "about__content--inactive"
              // }
              className="about__content"
            >
              Most people do not have professional knowledge about wine, so they
              tend to have difficulty finding perfect wine for their tables
              depending on the occasion(events) and preferences.
              <br />
            </div>
          </div>

          <div className="about__targetUser">
            <div className="about__title"> Target users</div>
            <hr className="about__hr" />
            <div className="about__content">
              People who would like to get reliable information about wine, and
              find wines that fits the users' preferred price range and
              characteristic of wine.
            </div>
          </div>
          <div className="about__solution">
            <div className="about__title"> Solution</div>
            <hr className="about__hr" />
            <div className="about__content">
              Podo involves not only general users but professional sommeliers.
              Sommeliers are allowed to create a wine list that refers to
              special theme and also leave a review on specific wines. Hence
              general users will be able to learn about the wine and
            </div>
          </div>
        </div>
        <div className="about__teamTitle">
          One Ego
          <div className="about__gitRepo">
            <div className="about__links">
              <a
                className="about__link"
                target="_blank"
                href="https://github.com/TREEANA/CSE416"
              >
                <div className="about__repo">
                  <FaGithubSquare value="front" />
                  <label for="front"> front-end</label>
                </div>
              </a>
            </div>
            <div className="about__links">
              <a
                className="about__link"
                target="_blank"
                href="https://github.com/Duk-young/Podo_Backend"
              >
                <div className="about__repo">
                  <FaGithubSquare value="back" />
                  <label for="back"> back-end</label>
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr className="about__hr" />
        <div className="about__team">
          <div className="about__part">
            <div className="about__partTitle">Front-end</div>
            <div className="about__partContent">
              <div className="about__ind">
                <img className="about__img" src={profileWHP} />
                <div className="about__info">
                  <div className="about__name"> Woohyun Park</div>
                  <div className="about__icons">
                    <div className="about__links">
                      <a
                        className="about__link"
                        target="_blank"
                        href="https://github.com/woohyun-park"
                      >
                        <FaGithubSquare />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about__ind">
                <img className="about__img" src={profileWHL} />
                <div className="about__info">
                  <div className="about__name"> Woohyung Lee</div>
                  <div className="about__icons">
                    <div className="about__links">
                      <a
                        className="about__link"
                        target="_blank"
                        href="https://github.com/TREEANA"
                      >
                        <FaGithubSquare />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about__ind">
                <img className="about__img" src={profileHRC} />
                <div className="about__info">
                  <div className="about__name"> Hyerin Choi</div>
                  <div className="about__icons">
                    <div className="about__links">
                      <a
                        className="about__link"
                        target="_blank"
                        href="https://github.com/zzaerynn"
                      >
                        <FaGithubSquare />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about__part">
            <div className="about__partTitle">Back-end</div>
            <div className="about__partContent">
              <div className="about__ind">
                <img className="about__img" src={profileDKE} />
                <div className="about__info">
                  <div className="about__name"> DukYoung Eom</div>
                  <div className="about__icons">
                    <div className="about__links">
                      <a
                        className="about__link"
                        target="_blank"
                        href="https://github.com/Duk-young"
                      >
                        <FaGithubSquare />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
