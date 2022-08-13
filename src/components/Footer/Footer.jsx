import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../Footer/Footer.scss";

function Footer() {

  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="footer-bar">
      <div className="footer-buttons">
        <div className="all-footer-content">
          <div className="left-right-content">
            <button className="footer-buttons"><NavLink className="footer-navs" to="/about-us"> About Us </NavLink></button>
            <button className="footer-buttons"><NavLink className="footer-navs" to="/warranty"> Warranty</NavLink></button>
          </div>
          <img className='logo-image' onClick={onClickLogo} src='https://res.cloudinary.com/demoshoebox/image/upload/c_thumb,w_200,g_face/v1660365841/products/important/logo-dark_ssw9ta.png' alt="logo"/>
          <div className="left-right-content">
            <button className="footer-buttons"><NavLink className="footer-navs" to="/shipping"> Shipping</NavLink></button>
            <button className="footer-buttons"><NavLink className="footer-navs" to="/returns"> Returns</NavLink></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
