import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__title-cont">
          <span className="footer__title">podo</span>
        </div>
        <div className="footer__cont">
          <div className="footer__section">
            HELP & SUPPORT
            <div className="footer__link">
              <Link to="/faq">FAQ</Link>
            </div>
            <div className="footer__link">
              <Link to="/email-us">Email Us</Link>
            </div>
          </div>
          <div className="footer__section">
            SOCIAL
            <div className="footer__link">
              <Link to="/instagram">Instagram</Link>
            </div>
            <div className="footer__link">
              <Link to="/facebook">Facebook</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
