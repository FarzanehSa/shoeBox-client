import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import GeneralContext from "../contexts/GeneralContext";
import "../styles/NavList.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import ShoppingCart from './ShoppingCart';
library.add(faBagShopping, faPhone, faGithub, faLinkedin);

const NavList = (props) => {

  const { cart } = useContext(GeneralContext);
  const [cartClick, setCartClick] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  
  // console.log("in here", cart);

  const onClickLogo = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the modal is open and the clicked target is not within the modal, then close the modal
      if (cartClick && ref.current && !ref.current.contains(e.target)) {
        setCartClick(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [cartClick]);

  const numberOfItemsInCart = cart.reduce((pre, cur) => pre + cur.quantity, 0);

  const [contactClick, setContactClick] = useState(false)
  const handleClick = event => {
    setContactClick(current => !current);
  };

  return (
    <div className="nav-bar">
      <div className="all-buttons">
        <div className='logo-to-name'>
          <img className='logo-image' onClick={onClickLogo} src='https://res.cloudinary.com/demoshoebox/image/upload/c_thumb,w_200,g_face/v1660365310/products/important/logo3_qlljwa.png' alt="logo"/>
          <div className='logo' onClick={onClickLogo}>The Shoebox</div>
        </div>
        <div className='left-and-right-navs'>
          <button className='nav-buttons'><NavLink className="navlink" to="/collection/men"> Men's Collection</NavLink></button>
          <button className='nav-buttons'><NavLink className="navlink" to="/collection/women"> Women's Collection</NavLink></button>
          <div>
          <button onClick={handleClick} className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-phone" size='lg' />&nbsp; Contact Us</button>
          {contactClick && (
            <div className='contact-info'>
              <div>Farzaneh Akhounsadegh: <a href='https://www.linkedin.com/in/farzaneh-sadegh-439b48ba'><FontAwesomeIcon icon="fa-brands fa-linkedin" style={{color:"blue"}}/></a> <a href='https://github.com/FarzanehSa'> <FontAwesomeIcon icon="fa-brands fa-github" style={{color:"blue"}} /></a></div>
              <div>Khaled Alkhatib: <a href='https://www.linkedin.com/in/khaledalkhatib/'> <FontAwesomeIcon icon="fa-brands fa-linkedin" style={{color:"blue"}}/></a> <a href='https://github.com/Khaled91Alkhatib'><FontAwesomeIcon icon="fa-brands fa-github" style={{color:"blue"}}/></a></div>
            </div>
          )}
          </div>
          <button disabled={cart.length === 0} onClick={() => { setCartClick(true); }} className='nav-buttons last-one'><FontAwesomeIcon icon="fa-solid fa-bag-shopping" size='lg' /><span className='badge badge-warning' id='lblCartCount'> {numberOfItemsInCart} </span>&nbsp; Shopping Cart</button>
          {cartClick && <ShoppingCart setCartClick={setCartClick} modalRef={ref} />}
        </div>
      </div>
      <div className='below-nav'>Enjoy our <strong>&nbsp;Free&nbsp;</strong> shipping</div>
    </div>
  );
};

export default NavList;
