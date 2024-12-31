import React, { useState, useContext } from "react";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Token } from "../App";

const LoginPage = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let token = useContext(Token);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const loginDetails = {
      username,
      password,
    };

    try {
      const { accessToken } = await loginUser(loginDetails);
      token = accessToken;
      console.log(token);
    } catch (error) {
      console.log(error);
    }

    return navigate("/");
  };

  return (
    <div className="login-container">
      <div>
        <div className="login-title">Login</div>
        <hr />
        <form onSubmit={login}>
          <label htmlFor="username" className="add-task-label">
            Username:
          </label>
          <input
            type="text"
            placeholder="username"
            className="input-auth"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="password"
            className="add-task-label"
            style={{ marginTop: "1rem" }}
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="password"
            className="input-auth"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p style={{ color: "gray", margin: "1rem" }}>
            Don't have an account yet?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
