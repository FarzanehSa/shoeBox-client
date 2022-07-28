import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import "../styles/NavList.scss";

import CartContext from '../contexts/CartContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faPhone } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from './ShoppingCart';
library.add(faBagShopping, faPhone);


const NavList = () => {
  const { cart } = useContext(CartContext);
  // console.log("in here", cart);

  const ref = useRef();

  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  const [cartClick, setCartClick] = useState(false);

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

  return (
    <div className="nav-bar">
      <img className='logo' onClick={onClickLogo} src="../logo.png" alt="logo here" />
      <div className="buttons">
        <button className='nav-buttons'><NavLink className="navlink" to="/about"> About Us </NavLink></button>
        <button className='nav-buttons'><NavLink className="navlink" to="/collection/men"> Men's Collection</NavLink></button>
        <button className='nav-buttons'><NavLink className="navlink" to="/collection/women"> Women's Collection</NavLink></button>
        <button className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-phone" size='lg' />&nbsp; Contact Us</button>
        <button onClick={() => { setCartClick(true); }} className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-bag-shopping" size='lg' /><span className='badge badge-warning' id='lblCartCount'> {numberOfItemsInCart} </span>&nbsp; Shopping Cart</button>
        {cartClick && <ShoppingCart continueShopping={setCartClick} modalRef={ref} />}
      </div>
    </div>
  );
};

export default NavList;
