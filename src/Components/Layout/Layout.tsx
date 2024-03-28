import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {
  return (
    <React.Fragment>
      <div className="container">
        <header className="header">
          <div className="btn-container">
            <button className="btn">авторизация</button>
            <button className="btn">выйти</button>
          </div>
        </header>
        <Outlet />
      </div>
    </React.Fragment>
  );
};
