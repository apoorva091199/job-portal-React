import React, { use } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {FaYoutubeSquare, FaTwitterSquare, FaLinkedin, FaInstagramSquare} from 'react-icons/fa';  


const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
    <footer>
      <div>
        <img src="/public/images/Gemini_Generated_Image_tdh1ittdh1ittdh1.png" alt="logo" />
      </div>
      <div>
        <h4>Support</h4>
        <ul>
          <li>Mumbai</li>
          <li>bhatapoorva91@gmail.com</li>
          <li>+91 7841847753</li>
        </ul>
      </div>
      <div>
        <h4>Quick Link</h4>
        <ul>
          <Link  to={"/"}>
          <li>Home</li>
          </Link>
          <Link  to={"/Jobs"}>
          <li>Jobs</li>
          </Link>
          

          {isAuthenticated && (
            <li>
              <Link to={"/Dashboard"}>Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
      <div>
        <h4>Follow Us</h4>
        <ul>
          <li>
            <Link to={"/"}>
            <span><FaTwitterSquare/></span>
            <span>Twitter (x)</span>
            </Link>
          </li>
           <li>
            <Link  to={"/"}>
            <span><FaInstagramSquare/></span>
            <span>Instagram</span>
            </Link>
          </li>
           <li>
            <Link  to={"/"}>
            <span><FaLinkedin/></span>
            <span>LinkedIn</span>
            </Link>
          </li>
           <li>
            <Link  to={"/"}>
            <span><FaYoutubeSquare/></span>
            <span>Facebook</span>
            </Link>
          </li>
          
        </ul>
      </div>
    </footer>
    <div className="copyright">
      &copy;copyright 2024 All Rights Reserved By Apoorva Bhat

    </div>
    </>
  );
};

export default Footer;
