import React, { useState } from "react";
import Order from "./Orders";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";

function Orders() {
  const Div = styled.div`
    padding: 20px 80px;

    h1 {
      margin: 30px 0;
    }
  `;
  const [{ basket }] = useStateValue();
  const [orders, setOrders] = useState([]);
  setOrders(basket);
  return (
    <Div>
      <h1>Your Orders</h1>

      <div className="order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </Div>
  );
}

export default Orders;
