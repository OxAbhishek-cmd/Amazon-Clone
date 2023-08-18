import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getAddress, getbasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  padding: 20px;
  background-color: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;

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
  }
`;

const Subtotal = () => {
  const [{user},]=useStateValue();
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  const amount = getbasketTotal(basket);
  const handleRedirect=()=>{
    if(getAddress(user)){
      navigate("/payment");
    }
    else{
      navigate("/address");
    }
  }

  return (
    <Div>
      <SubtotalComponent itemCount={basket.length} amount={amount} />
      <button onClick={handleRedirect}>Proceed to Checkout</button>
    </Div>
  );
};

const SubtotalComponent = ({ itemCount, amount }) => {
  const currencyOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <div>
      <p>
        Subtotal ({itemCount} items):
        <strong>{amount.toLocaleString("en-US", currencyOptions)}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
    </div>
  );
};

export default Subtotal;
