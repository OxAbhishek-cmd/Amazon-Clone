// OrderHistory.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrder } from '../../API/order';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const OrderLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  flex: 1;
`;

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
`;

const CountBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  background-color: #fff;
`;

const formatOrderDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrder();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <OrderList>
          {orders.map((order) => (
            <OrderItem key={order.order_id}>
              <OrderLink to={`/order/${order.order_id}`}>
                {`Order #${order.order_id} - ${formatOrderDate(order.date)}`}
              </OrderLink>
              {order.order_item.slice(0, 3).map((item, index) => (
                <ImageBox key={item.product_id}>
                  <img src={item.image} alt={`Product ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                </ImageBox>
              ))}
              {order.order_item.length > 3 && (
                <CountBox>+{order.order_item.length - 3}</CountBox>
              )}
            </OrderItem>
          ))}
        </OrderList>
      )}
    </Container>
  );
};

export default Order;
