import React from 'react';
import Logo from './logo';
import Links from './Links';
import LoginButton from './LoginButton';
import '../css/header.css';
function Header() {

    const listOfNav = {
        "Home": "index.html",
        "About" :  "about.html", 
        "Services": "services.html",
        "Search": "search.html", 
        "Contact": "contact.html",  
        }

    return (
    <header>
      <Logo />
      <nav><Links listOfLink = {listOfNav}/></nav>
      <LoginButton/>
    </header>
    );
};

export default Header;