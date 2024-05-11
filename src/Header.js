import React from "react";
import { Link, Outlet } from "react-router-dom";
import config from "./config";

const Header = () => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h1
            style={{ display: "inline" }}
            onMouseOver={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            {config.NAME}
          </h1>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
