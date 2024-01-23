import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FinalBalance } from "../../AdditionalFunction";

const SubtotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  padding: 20px;
  background-color: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .subtotal__gift {
    display: flex;
    align-items: center;
    input {
      margin-right: 5px;
    }
  }

  button {
    background-color: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ddb347;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const Subtotal = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const count = cart.length;
  const address = useSelector((state) => state.address);

  const handleRedirect = () => {
    if (!user) {
      navigate("/login");
    }
    if (address.country) {
      navigate("/address");
    } else {
      navigate("/payment");
    }
  };

  const currencyOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(FinalBalance(cart));
  }, [cart]);

  return (
    <SubtotalContainer>
      <div>
        <p>
          Subtotal ({count} items):
          <strong>{amount.toLocaleString("en-US", currencyOptions)}</strong>
        </p>
        <small className="subtotal__gift">
          <input type="checkbox" /> This order contains a gift
        </small>
      </div>
      <button onClick={handleRedirect}>Proceed to Checkout</button>
    </SubtotalContainer>
  );
};

export default Subtotal;
