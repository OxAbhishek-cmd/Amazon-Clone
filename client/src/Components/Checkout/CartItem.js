import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteToCart, updateToCart } from "../../Redux/Slice/cartSlice";
import { deletecart, putCart } from "../../API/cart";

const Div = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;

  .image {
    object-fit: contain;
    width: 180px;
    height: 180px;
    border-radius: 4px;
  }

  .info {
    padding-left: 20px;

    .title {
      font-size: 17px;
      font-weight: 800;
      margin-bottom: 5px;
    }

    .price {
      font-size: 16px;
      margin-bottom: 10px;

      small {
        font-size: 80%;
      }

      strong {
        margin-left: 5px;
      }
    }

    .quantity {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin-bottom: 10px;

      label {
        font-weight: 600;
        margin-bottom: 5px;
      }

      select {
        padding: 5px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        width: 55px;
      }
    }

    button {
      background-color: #f0c14b;
      border: 1px solid;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ddb347;
      }
    }
  }
`;

const CartItem = (props) => {
  const { product_id, image, title, price, hideButton, quantity } = props;
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const dispatch = useDispatch();
  const user = localStorage.getItem("authtoken");

  useEffect(() => {
    const updateCart = async () => {
      if (user) {
        await putCart(product_id, selectedQuantity);
      }
      dispatch(
        updateToCart({ info: { product_id, quantity: selectedQuantity } })
      );
    };

    updateCart();
    // eslint-disable-next-line
  }, [selectedQuantity]);

  const update = (e) => {
    const updatedValue = parseInt(e.target.value);
    setSelectedQuantity(updatedValue);
  };

  const remove = async (e) => {
    if (user) {
      await deletecart(product_id, e.target.value);
    }
    dispatch(deleteToCart({ info: { product_id } }));
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
        {!hideButton && (
          <>
            <div className="quantity">
              <label htmlFor="quantity">Quantity:</label>
              <select value={selectedQuantity} onChange={update}>
                {Array.from({ length: 14 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={remove}>Remove from Cart</button>
          </>
        )}
      </div>
    </Div>
  );
};

export default CartItem;
