import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderbyId } from '../../API/order';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const OrderInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const OrderDate = styled.div`
  font-size: 18px;
`;

const OrderAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const OrderItems = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const OrderPreview = () => {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const fetchOrderById = async (id) => {
      const data = await orderbyId(id);
      setOrderInfo(data);
    };
    fetchOrderById(id);
  }, [id]);

  return (
    <Container>
      {orderInfo && (
        <>
          <OrderHeader>
            <OrderInfo>
              <OrderDate>{new Date(orderInfo.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</OrderDate>
              <OrderAmount>Total Amount: ${orderInfo.amount}</OrderAmount>
            </OrderInfo>
            <div>Order #{orderInfo.order_id}</div>
          </OrderHeader>

          <OrderItems>
            {orderInfo.order_item.map((item) => (
              <OrderItem key={item.item_id}>
                <ItemImage src={item.image} alt={item.title} />
                <ItemDetails>
                  <div>{item.title}</div>
                  <div>Price: ${item.price}</div>
                  <div>Quantity: {item.quantity}</div>
                </ItemDetails>
              </OrderItem>
            ))}
          </OrderItems>
        </>
      )}
    </Container>
  );
};

export default OrderPreview;
