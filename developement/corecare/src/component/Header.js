import React from 'react';
import { useState, useEffect } from "react";
import Logo from './logo';
import Links from './Links';
import '../css/header.css';
import { CiLogin } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
function Header() {

  const listOfNav = {
    "Home": "/",
    "About": "/about_us",
    "Services": "/services",
    "Search": "/search",
    "Contact": "/contact",
  }

  const [expandedList, setExpandedList] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth  > 966) {
        setExpandedList(true);
      }
      else {
        setExpandedList(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setExpandedList(!expandedList);
  };
  return (
    <header>
      <Logo />
      <nav style={{ display: `${expandedList ? 'flex' : 'none'}` }}><Links listOfLink={listOfNav} /></nav>

      <Link className='link_route' style={{ display: `${expandedList ? 'flex' : 'none'}` }}>
        login
        <span><CiLogin /></span>
      </Link>

      <span className='menu'
        onClick={handleClick}><MdMenu />
      </span>

    </header>
  );
};

export default Header;