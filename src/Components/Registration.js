import logo from "./Logo/bw-amazon-logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  img{
    margin: 20px auto 20px auto;
    object-fit: contain;
    width: 100px;
  }
  .container{
    border:1px solid darkgray;
    border-radius:5px ;
    height: fit-content;
    padding: 20px;
    width:300px;
    display: flex;
    flex-direction: column;

    h1{
      font-weight: 500;
      margin-bottom: 20px;
    }
    form{
      h5 {
        margin: 5px;
      }
      input {
        height: 30px;
        margin-bottom: 10px;
        background-color: white;
        width: 98%;
      }
      button{
        background-color: #f0c14b;
        border-radius: 2px;
        width: 100%;
        height: 30px;
        border: 1px solid;
        margin-top: 10px;
        border-color: #a88734 #9c7e31 #846a29;
      }
    }
    .policies{
      margin-top: 15px;
      font-size: 12px;
    }
    .signInPage{
      margin-top: 15px;
      font-size: 12px;
      border-top:1px solid black;
      padding-top:5px ;
    }
  }
`;

const Registration = () => {
  const [,dispatch]= useStateValue();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const validateEmail = (email) => {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  
  const signUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword || !validateEmail(email)) {
      return;
    }
    
    const response = await fetch("http://localhost/api/credentials/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });


    const data = await response.json(); // Await the JSON parsing
    if(data){
      dispatch({
        type:'SET_USER',
        user:data.insertResults
      })
    }
    localStorage.setItem("auth",data.authtoken)
    navigate("/");
  };

  return (
    <Div>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="container">
        <h1>Create account</h1>
        <form>
          <h5>Your name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="First and last name"
            required
          />
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            className={`${password !== confirmPassword ? "border_red" : ""}`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="At least 8 characters"
            required
          />
          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            className={`${password !== confirmPassword ? "border_red" : ""}`}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            onClick={signUp}
            disabled={password !== confirmPassword || !validateEmail(email)}
          >
            Continue
          </button>
        </form>
        <p className="policies">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>

        <div className="signInPage">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </Div>
  );
};

export default Registration;
