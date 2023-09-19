import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import OrderItem from "./OrderItem";

const Div = styled.div`
  padding: 20px;
`;

function Order() {
  const { orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Fetch order data from your backend
    const response = fetch(`http://localhost:5000/api/cart/getcart`, {
      method: "POST",
      header: { "auth-token": localStorage.getItem("auth") },
    });

    if (response && Array.isArray(response)) {
      // Filter order items for the given orderId
      const filteredItems = response.data.filter(
        (item) => item.order_id === orderId
      );
      setOrderItems(filteredItems);
    }
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
