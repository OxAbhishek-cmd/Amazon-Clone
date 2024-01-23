import React from "react";
import styled from "styled-components";
import Subtotal from "./Subtotal";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import banner from "../Logo/checkout_banner.jpg";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  height: max-content;

  @media (min-width: 768px) {
    flex-direction: row;

    .checkout__left {
      flex: 2;
      margin-right: 20px;

      .checkout__ad {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .checkout__right {
      flex: 1;
    }
  }

  .checkout__left {
    .checkout__ad {
      width: 100%;
      margin-bottom: 10px;
    }
    .checkout__title {
      margin-right: 10px;
      padding: 10px;
      border-bottom: 1px solid lightgray;
    }
  }
`;

function Checkout() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const count = cart.length;

  return (
    <Div>
      <div className="checkout__left">
        <img
          src={banner}
          alt=""
          className="checkout__ad"
        />
        <div>
          <h3>Hello, {user?.name}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>
        </div>

        {count > 0
          ? cart.map((element) => (
              <CartItem
                product_id={element.product_id}
                key={element.product_id}
                image={element.image}
                title={element.title}
                rating={element.rating}
                price={element.price}
                quantity={element.quantity}
              />
            ))
          : "Cart is Empty"}
      </div>

      <div className="checkout__right">
        <h2>Sub total</h2>
        <Subtotal />
      </div>
    </Div>
  );
}

export default Checkout;
