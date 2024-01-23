import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Checkout/CartItem";
import { FinalBalance as totalAmount } from "../../AdditionalFunction";
import { postOrder } from "../../API/order";
import { resetCart } from "../../Redux/Slice/cartSlice";
const Div = styled.div`
  background-color: white;

  .container {
    h1 {
      text-align: center;
      padding: 10px;
      font-weight: 400;
      background-color: rgb(234, 237, 237);
      border-bottom: 1px solid lightgray;
      a {
        text-decoration: none;
        color: black;
      }
    }
    .section {
      display: flex;
      padding: 20px;
      margin: 0 20px;
      border-bottom: 1px solid lightgray;

      .title {
        flex: 0.2;
      }

      .address,
      .items,
      .details {
        flex: 0.8;
      }
      .details {
        h3 {
          padding-bottom: 21px;
        }
        form > div > button {
          background: #f0c14b;
          border-radius: 2px;
          width: 100%;
          height: 30px;
          border: 1px solid;
          font-weight: bolder;
          margin-top: 10px;
          border-color: #a88734 #9c7e31 #846a29;
          color: #111;
          max-width: 222px;
        }
      }
    }
  }
`;
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("authtoken");
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate])
  const cart = useSelector((state) => state.cart);
  const count = cart.length;
  const address = useSelector((state) => state.address);
  const orderTotal = totalAmount(cart);
  const formattedOrderTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(orderTotal);
  const orderHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await postOrder(cart);
      const orderId = response.orderId;
      if (orderId) {
        console.log(orderId)
        dispatch(resetCart());
        navigate(`/order/${orderId}`);
      } else {
        // Handle the case where orderId is not present in the response
        console.error('Order ID not found in the response.');
        // You may add additional error handling or redirect the user to an error page.
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      // Handle the error, you may redirect the user to an error page.
    }
  };

  return (
    <Div>
      <div className="container">
        <h1>
          Checkout (<Link to="/checkout">{count} items</Link>)
        </h1>
        {/* Payment Section - delivery address */}
        <div className="section">
          <div className="title">
            <h3>Delivery Address</h3>
          </div>
          <div className="address">
            <p>{address.fullName}</p>
            <p>{address.Address[0]}</p>
            <p>{address.Address[1]}</p>
            <p>{`${address.city},${address.state}`}
            </p>
            <p>
              {`${address.Country},${address.zipCode}`}
            </p>
            <p>Phone : {address.phoneNumber}</p>
          </div>
        </div>
        {/* Payment Section - Review Items */}
        <div className="section">
          <div className="title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="items">
            {cart?.map((item) => (
              <CartItem
                key={item.product_id}
                id={item.product_id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
                hideButton = {true}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="section">
          <div className="title">
            <h3>Payment Method</h3>
          </div>
          <div className="details">
            <form>
              <div className="priceContainer">
                <h3>Order Total: {formattedOrderTotal}</h3>
                <button onClick={orderHandler}>
                  <span>Buy Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Payment;
