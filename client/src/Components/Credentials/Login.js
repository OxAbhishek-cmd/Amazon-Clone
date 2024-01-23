import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../Logo/bw-amazon-logo.png";
import { login } from "../../API/user";

const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;

.logo {
  width: 100px;
  object-fit: contain;
  margin-bottom: 20px;
}
.container{
  background-color:white;
  padding:20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  h5 {
    text-align: left;
    margin: 10px 0;
  }
  input {
    width: 95%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
    &:focus{
      outline: none;
      border-color: #007185;
    }
  }
  .signInButton {
    background-color: #f0c14b;
    border: 1px solid;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover{
      background-color:#ddb347;
    }
  }

  .registerButton {
    background-color: #111;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #555;
    }
  }

  p {
    margin-top: 20px;
    font-size: 0.8rem;
    color: #555;
  }

  @media (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
}
`;
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggined = localStorage.getItem("authtoken")
  console.log(location.state?.from);
  useEffect(() => {
    if (isLoggined) {
      navigate("/");
    }
  }, [isLoggined, navigate])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signIn = async (e) => {
    e.preventDefault();
    const responce = await login(email, password)
    if (responce.status === "success") {
      const lastPath = location.state?.from || "/";
      navigate(lastPath);
    }
    else {
      alert("Something went Wrong ! Please re-try")
    }
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
            placeholder="Enter Email"
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
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