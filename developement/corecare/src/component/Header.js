import React from 'react';
import { useState ,useEffect} from "react";
import Logo from './logo';
import Links from './Links';
import '../css/header.css';
import { CiLogin } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
function Header() {

    const listOfNav = {
        "Home": "index.html",
        "About" :  "about.html", 
        "Services": "services.html",
        "Search": "search.html", 
        "Contact": "contact.html",  
        }

        // const [expandedIcon, setExpandedIcon] = useState(false);

        const [expandedList, setExpandedList] = useState(false);
        // const [expanded, setExpanded] = useState(false);
        useEffect(()=>{
          const handleResize = () => {
            if((window.innerWidth * 0.9) > 966) {
              setExpandedList(true);
            }
            else{
              setExpandedList(false);
            }
          };
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        },[]);
        
        const handleClick = () => {
          setExpandedList(!expandedList);
        };
        return (
    <header>
        <Logo />
        <nav style={{ display: `${expandedList ? 'flex' : 'none'}` }}><Links listOfLink = {listOfNav}/></nav>
        
        <button style={{ display: `${expandedList ? 'flex' : 'none'}` }}>
          login
        <span><CiLogin /></span>
        </button>

        <span className='menu' 
        onClick={handleClick}><MdMenu />
        </span>

    </header>
    );
};

export default Header;