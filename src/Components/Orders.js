// Order.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderItem from "./OrderItem";
import styled from "styled-components";
import axios from "axios";
import { useStateValue } from "../StateProvider";
const Div = styled.div`
  padding: 20px;
`;

function Order() {
  const { orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [{host}]=useStateValue();
  useEffect(() => {
    // Fetch order data from your backend
    axios
      .post(`${host}/cart/get`, {
        // You can add any necessary request data here
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          // Filter order items for the given orderId
          const filteredItems = response.data.filter(
            (item) => item.order_id === orderId
          );
          setOrderItems(filteredItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching order data: ", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Div>
      <h2>Order #{orderId}</h2>
      <h3>Order Items</h3>
      <div className="order-items">
        {orderItems.map((item, index) => (
          <OrderItem key={index} item={item.item} />
        ))}
      </div>
    </Div>
  );
}

export default Order;
