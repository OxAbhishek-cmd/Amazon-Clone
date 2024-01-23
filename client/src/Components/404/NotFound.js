import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .back-to-home {
    text-decoration: none;
    padding: 10px 20px;
    background-color: #f0c14b;
    border: 1px solid #a88734 #9c7e31 #846a29;
    color: #111;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .back-to-home:hover {
    background-color: #ddb347;
  }
`;

const NotFound = () => {
  return (
    <ErrorContainer>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for might be unavailable or does not exist.</p>
      <Link to="/" className="back-to-home">
        Back to Home
      </Link>
    </ErrorContainer>
  );
};

export default NotFound;
