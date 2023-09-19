import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BasketItem from "../Checkout/BasketItem";
import { totalAmount } from "../actions/counterActions";

const Div = styled.div`
  background-color: white;

  .container {
    h1 {
      text-align: center;
      padding: 10px;
      font-weight: 400;
      background-color: rgb(234, 237, 237);
      border-bottom: 1px solid lightgray;
      a {
        text-decoration: none;
        color: black;
      }
    }
    .section {
      display: flex;
      padding: 20px;
      margin: 0 20px;
      border-bottom: 1px solid lightgray;

      .title {
        flex: 0.2;
      }

      .address,
      .items,
      .details {
        flex: 0.8;
      }
      .details {
        h3 {
          padding-bottom: 21px;
        }
        form > div > button {
          background: #f0c14b;
          border-radius: 2px;
          width: 100%;
          height: 30px;
          border: 1px solid;
          font-weight: bolder;
          margin-top: 10px;
          border-color: #a88734 #9c7e31 #846a29;
          color: #111;
          max-width: 222px;
        }
      }
    }
  }
`;
const Payment = () => {
  const count = useSelector((state) => state.basketReducer.count);
  const basket = useSelector((state) => state.basketReducer.basket);
  const address = useSelector((state) => state.addressReducer.address);
  const orderTotal = totalAmount(basket);
  const formattedOrderTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(orderTotal);
  const navigate = useNavigate();
  return (
    <Div>
      <div className="container">
        <h1>
          Checkout (<Link to="/checkout">{count} items</Link>)
        </h1>
        {/* Payment Section - delivery address */}
        <div className="section">
          <div className="title">
            <h3>Delivery Address</h3>
          </div>
          <div className="address">
            <p>{address.fullName}</p>
            <p>{address.Address[0]}</p>
            <p>{address.Address[1]}</p>
            <p>
              {address.city},{address.state}
            </p>
            <p>
              {address.Country},{address.zipCode}
            </p>
            <p>Phone : {address.phoneNumber}</p>
          </div>
        </div>
        {/* Payment Section - Review Items */}
        <div className="section">
          <div className="title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="items">
            {basket?.map((item) => (
              <BasketItem
                key={item.product_id}
                id={item.product_id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="section">
          <div className="title">
            <h3>Payment Method</h3>
          </div>
          <div className="details">
            <form>
              <div className="priceContainer">
                <h3>Order Total: {formattedOrderTotal}</h3>
                <button
                  onClick={() => {
                    navigate("/order");
                  }}
                >
                  <span>"Buy Now"</span> {/* Fix: Remove extra quotes */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Payment;
