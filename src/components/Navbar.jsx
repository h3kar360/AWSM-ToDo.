import React, { useContext } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { Token } from "../App";

const Navbar = ({ logout }) => {
  const [token, setToken] = useContext(Token);

  const activateButton = ({ isActive }) =>
    isActive ? "nav-button-active" : "nav-button";

  return (
    <>
      <nav>
        <div className="logo">AWSM ToDo.</div>
        <div>
          <NavLink to="/" className={activateButton}>
            Home
          </NavLink>
          {token !== "" && (
            <NavLink to="/add-todo" className={activateButton}>
              Add ToDo
            </NavLink>
          )}
          {token === "" ? (
            <NavLink to="/login" className={activateButton}>
              Login
            </NavLink>
          ) : (
            <button onClick={logout} className="nav-button">
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
