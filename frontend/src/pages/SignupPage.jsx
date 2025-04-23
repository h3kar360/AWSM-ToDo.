import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ signupUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();

    const signupDetails = {
      username,
      password,
    };

    signupUser(signupDetails);

    return navigate("/login");
  };

  return (
    <div className="login-container" style={{ marginTop: "8rem" }}>
      <div>
        <div className="login-title">Signup</div>
        <hr />
        <form onSubmit={signup}>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
