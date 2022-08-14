import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import "./NavbarAdminPortal.scss";

import GeneralContext from "../../contexts/GeneralContext";
import {SidebarAdminPortal} from "./SidebarAdminPortal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const NavbarAdminPortal = (props) => {

  const { user, setUser } = useContext(GeneralContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnchorEl(null);
  }, [user]);
  
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  
  const onClickLogo = () => {
    navigate('/');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="nav-bar-admin" style={{zIndex:props.zIndex}}>
        <NavLink to="#" className='menu-bars'>
          <FontAwesomeIcon className='bar' icon="fa-solid fa-bars" onClick={() => showSidebar()} />
        </NavLink>
        <div className='logo-to-name'>
          <img className='logo-image' onClick={onClickLogo} src='../logo-dark.png' alt="logo"/>
          <div className='logo' onClick={onClickLogo}>The Shoebox</div>
        </div>
        {user.name && <div className='admin-logo'>
          <IconButton
            // size="large"
            // aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          > 
            <img src='../admin-icon.png' alt="admin" className='admin-logo-img'/>
            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem 
              onClick={() => {
                setUser({})
                handleClose()
              }}
            >Logout</MenuItem>
          </Menu>
        </div>}
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={() => showSidebar()}>
          <li className='navbar-toggle'>
            <NavLink to="#" className='menu-bars'>
              <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
            </NavLink>
          </li>
          {SidebarAdminPortal.map((link, index) => {
            return(
              <li key={index} className={link.cName}>
                <NavLink to={link.path}>
                  {link.icon}
                  <span>{link.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </>

  );
};

export default NavbarAdminPortal;
