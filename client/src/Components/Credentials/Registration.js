import logo from "../Logo/bw-amazon-logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createAccount } from "../../API/user";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  img {
    width: 100px;
    object-fit: contain;
    margin-bottom: 20px;
  }

  .container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

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
  }

  input:focus {
    outline: none;
    border-color: #007185;
  }

  .border_red {
    border-color: #ff0000 !important;
  }

  button {
    width: 100%;
    height: 40px; /* Adjust height as needed */
    background-color: #f0c14b;
    border: 1px solid;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ddb347;
  }

  .policies {
    margin-top: 20px;
    font-size: 0.8rem;
    color: #555;
  }

  .signInPage {
    margin-top: 20px;
  }

  .login {
    color: #007185;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .login:hover {
    color: #004554;
  }

  @media (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
`;
const Registration = () => {
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
        const responce = await createAccount(name, email, password)
        if (responce.status === "success") {
            navigate("/");
        }
        else {
            alert("Something went Wrong ! Please re-try")
        }
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
                        placeholder="Enter Email"
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
                        placeholder="Re-enter Password"
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
                    By creating an account, you agree to Amazon's Conditions of Use and
                    Privacy Notice.
                </p>

                <div className="signInPage">
                    <p>
                        Already have an account? <Link to="/login" className="login">Sign in</Link>
                    </p>
                </div>
            </div>
        </Div>
    );
};

export default Registration;