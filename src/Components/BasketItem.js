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
    .quantity {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      label {
        font-weight: 600;
        margin-bottom: 5px;
      }
      select {
        padding: 5px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
      }
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
const BasketItem = ({
  id,
  image,
  title,
  rating,
  price,
  hideButton,
  quantity,
}) => {
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
        <div className="quantity">
          <label htmlFor="quantity">Quantity:</label>

          <select>
            {Array.from({ length: 14 }, (_, i) => (
              <option
                key={i + 1}
                value={i + 1}
                selected={quantity === i + 1}
                onClick={(e) => {
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    id: id,
                    quantity: e.target.value,
                  });
                }}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </Div>
  );
};

export default BasketItem;
