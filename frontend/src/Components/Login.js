import logo from "./Logo/bw-amazon-logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .logo {
    margin-top: 20px;
    margin-bottom: 20px;
    object-fit: contain;
    width: 100px;
    margin-right: auto;
    margin-left: auto;
  }
  .container {
    width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 20px;
    h1 {
      font-weight: 500;
      margin-bottom: 20px;
    }
    form {
      h5 {
        margin: 5px;
      }
      input {
        height: 30px;
        margin-bottom: 10px;
        background-color: white;
        width: 98%;
      }

      .signInButton {
        background-color: #f0c14b;
        border-radius: 2px;
        width: 100%;
        height: 30px;
        border: 1px solid;
        margin-top: 10px;
        border-color: #a88734 #9c7e31 #846a29;
      }
    }
    p {
      margin-top: 15px;
      font-size: 12px;
    }
    .registerButton {
      border-radius: 2px;
      width: 100%;
      height: 30px;
      border: 1px solid;
      margin-top: 10px;
      border-color: darkgray;
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/credentials/loginuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    localStorage.setItem("auth", data.token);
    navigate("/");
  };

  const register = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const validateEmail = (email) => {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  return (
    <Div>
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <div className="container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="signInButton"
            type="submit"
            onClick={signIn}
            disabled={
              validateEmail(email) && password.length >= 8 ? false : true
            }
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button className="registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </Div>
  );
};

export default Login;
