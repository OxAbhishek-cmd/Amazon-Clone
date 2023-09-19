import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { updateInBasket, addToBasket } from "../actions/counterActions";
import { useDispatch, useSelector } from "react-redux";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-height: 400px;
  min-width: 100px;
  background-color: white;
  z-index: 1;

  .rating {
    display: flex;
    flex-direction: row;
  }

  & > img {
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }

  & > button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
  }

  .price {
    margin-top: 5px;
  }

  .info {
    height: 100px;
    margin-bottom: 15px;
  }
`;

const Product = (props) => {
  const { product_id, title, image, price, rating } = props;

  const findIndexof = (basket, count, product_id) => {
    for (let i = 0; i < count; i++) {
      if (basket[i].product_id === product_id) {
        return i;
      }
    }
    return -1;
  };

  const count = useSelector((state) => state.basketReducer.count);
  const basket = useSelector((state) => state.basketReducer.basket);
  const dispatch = useDispatch();
  const addToBasketClick = () => {
    const coord = findIndexof(basket, count, product_id);
    if (coord >= 0) {
      dispatch(updateInBasket(product_id, basket[coord].quantity + 1));
    } else {
      dispatch(
        addToBasket({
          product_id,
          title,
          image,
          price,
          rating,
          quantity: 1,
        })
      );
    }
  };

  return (
    <Div>
      <div className="info">
        <p>{title}</p>
        <p className="price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasketClick}>Add to Basket</button>
    </Div>
  );
};

Product.propTypes = {
  product_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default Product;
