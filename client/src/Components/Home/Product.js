import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { findIndexof } from "../../AdditionalFunction";
import { postCart, putCart } from "../../API/cart";
import { addToCart, updateToCart } from "../../Redux/Slice/cartSlice";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  width: 90%;
  height: 400px; /* Set a fixed height for all product boxes */
  min-width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    margin-bottom: 15px;

    @media screen and (min-width: 600px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .rating {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;

    p {
      margin: 0; /* Remove default margin */
    }
  }

  img {
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  button {
    height: 30px;
    width: 120px;
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #d8ab4e;
    }
  }

  .price {
    text-align: center;
    margin-top: 10px;
  }
`;

const Product = (props) => {
  const { product_id, title, image, price, rating } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartClick = async () => {
    const index = findIndexof(cart, "product_id", product_id);
    if (index !== -1) {
      if (localStorage.getItem("authtoken")) {
        await putCart(product_id, cart[index].quantity + 1);
      }
      dispatch(
        updateToCart({
          info: { product_id, quantity: cart[index].quantity + 1 },
        })
      );
    } else {
      if (localStorage.getItem("authtoken")) {
        await postCart(product_id, 1);
      }
      dispatch(
        addToCart({
          item: {
            product_id,
            title,
            image,
            price,
            quantity: 1,
          },
        })
      );
    }
  };

  return (
    <Div>
      <div className="info">
        <div>
          <p>{title}</p>
          <p className="price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        </div>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToCartClick}>Add to Cart</button>
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
