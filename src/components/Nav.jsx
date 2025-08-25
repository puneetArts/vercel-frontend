import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css'
import { LiaAngleDoubleUpSolid } from "react-icons/lia";
import { HiOutlineUser } from "react-icons/hi2";
import { RiMessage3Line } from "react-icons/ri";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdOutlineGroups } from "react-icons/md";


const Nav = () => {

  const [activeNav, setActiveNav] = useState('#');

  

  return (
    <nav className='nav'>
      <a href='#' className={`tooltip`}><LiaAngleDoubleUpSolid />
      <span className="tooltip-text">Scroll Up</span></a>

      {/* <a href='#' onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><IoChevronUpOutline /></a> */}


      {/* <a href='#about' onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><HiOutlineUser /></a> */}

      <a href="/edit-profile" onClick={() => setActiveNav('#edit-profile')}   className={`tooltip ${activeNav === '#edit-profile' ? 'active' : ''}`}
 >
        <CgAddR />
        <span className="tooltip-text">Create Post</span>
      </a>

      <a href='#newsletter' className={`tooltip`}><HiOutlineDocumentText />
      <span className="tooltip-text">Newsletter</span></a>

     {/* Club-section */}
      <Link to="/clubs"  className={`tooltip clubs-link`}>
        <MdOutlineGroups />
        <span className="tooltip-text">Clubs</span>
      </Link>

      
    {/*
      <a href='#clubs' className={`tooltip`}><MdOutlineGroups />
      <span className="tooltip-text">Clubs</span></a>
      

      <a href="/create-club" className="tooltip-text"> <MdOutlineGroups /> <span className="tooltip-text">Create Club</span> </a>  */}

      {/* Club-section */}

      <a href='#chats' className={`tooltip`}><RiMessage3Line />
      <span className="tooltip-text">Chats</span></a>

    </nav>
  )
}

export default Nav