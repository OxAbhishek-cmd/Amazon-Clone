import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
const Div = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  .image {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }
  .info {
    padding-left: 20px;
    .title {
      font-size: 17px;
      font-weight: 800;
    }
    .rating {
      display: flex;
      flex-direction: row;
    }
    button {
      background-color: #f0c14b;
      border: 1px solid;
      margin-top: 10px;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
    }
  }
`;
const BasketItem = ({ id, image, title, rating, price, hideButton }) => {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    //remove the item
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <Div>
      <img src={image} alt="" className="image" />
      <div className="info">
        <p className="title">{title}</p>
        <p className="price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </Div>
  );
};

export default BasketItem;
