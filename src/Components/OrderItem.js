// OrderItem.js
import React from "react";
import styled from "styled-components";

const Div = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  .order-item-info {
    flex: 1;
    padding-left: 10px;
  }
`;

function OrderItem({ item }) {
  return (
    <Div>
      <img src={item.image} alt={item.title} width="100" height="100" />
      <div className="order-item-info">
        <h4>{item.title}</h4>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        {/* Add more item details as needed */}
      </div>
    </Div>
  );
}

export default OrderItem;
