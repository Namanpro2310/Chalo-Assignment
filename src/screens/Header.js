import React from "react";
import { Link } from "react-router-dom";
import chaloLogo from "../assets/CHALO_Logo.jpeg";

import "./Routes.css";

const Header = () => {
  return (
    <div className="header-div">
      <div className="header-nav">
        <Link to={"/"}>
          <img src={chaloLogo} className="chalo-logo" alt="logo" />
        </Link>
        <div className="options">
          <Link to={"/AddRoutes"}>Add Routes</Link>
          <span className="divider">|</span>
          <Link to={"/ViewRoutes"}>View Routes</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
