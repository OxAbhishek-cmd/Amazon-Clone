import React from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import styled from "styled-components";
import { getbasketTotal } from "../reducer";
function Order({ order }) {
  const Div = styled.div`
    padding: 40px;
    margin: 20px 0;
    border: 1px solid lightgray;
    background-color: white;
    position: relative;

    .id {
      position: absolute;
      top: 40px;
      right: 20px;
    }

    .total {
      font-weight: 500;
      text-align: right;
    }
  `;

  const orderTotal = getbasketTotal();
  const formattedOrderTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(orderTotal);
  return (
    <Div>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <h3>Order Total: {formattedOrderTotal}</h3>
    </Div>
  );
}

export default Order;
