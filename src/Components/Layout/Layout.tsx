import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { useAuthContext } from "../../auth/AuthContextProvider";

export const Layout = () => {
  const { logOut } = useAuthContext();
  return (
    <React.Fragment>
      <div className="container">
        <header className="header">
          <div className="btn-container">
            <button onClick={() => logOut()} className="btn">
              Выйти
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </React.Fragment>
  );
};
