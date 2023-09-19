import React from "react";
import styled from "styled-components";
import Subtotal from "./Subtotal";
import BasketItem from "./BasketItem";
import { useSelector } from "react-redux";
const Div = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  height: max-content;
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

  .checkout__right {
  }
`;
function Checkout() {
  const user = useSelector((state) => state.userReducer.user);
  const count = useSelector((state) => state.basketReducer.count);
  const basket = useSelector((state) => state.basketReducer.basket);
  return (
    <Div>
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__ad"
        />
        <div>
          <h3>Hello, {user?.name}</h3>
          <h2 className="checkout__title">Your Shopping basket</h2>
        </div>

        {count > 0
          ? basket.map((element) => (
              <BasketItem
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
        <h2>Sub total will ho here</h2>
        <Subtotal />
      </div>
    </Div>
  );
}
export default Checkout;
