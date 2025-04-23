import React from "react";
import "../styles/StartingPortal.css";
import { Link } from "react-router-dom";

const StartingPortal = () => {
  return (
    <span className="intro-container">
      <h1>Welcome to AWSM ToDo.</h1>
      <h3>
        Please{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          login
        </Link>{" "}
        to use our service.
      </h3>
    </span>
  );
};

export default StartingPortal;
