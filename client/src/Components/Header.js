import React, { useEffect, useState } from "react";
import logo from "./Logo/amazon-logo.png";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../API/user";
import { bulkPostCart, getCart } from "../API/cart";
import { setToUser, resetUser } from "../Redux/Slice/userSlice";
import { resetCart, setCart } from "../Redux/Slice/cartSlice";
import { resetAddress, setToAddress } from "../Redux/Slice/addressSlice";
import { mergeCart } from "../AdditionalFunction";
import { getAddress } from "../API/address";

// Styled component for the header
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.5s ease;

  .logo {
    width: 100px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 18px;
  }

  .nav {
    display: flex;
    align-items: center;
    color: white;

    .option {
      display: flex;
      flex-direction:column;
      margin: 0 10px;
      cursor: pointer;
      transition: color 0.3s ease;
      color:white;
      &:hover {
        color: #ffd700;
      }

      .lineOne {
        font-size: 10px;
      }

      .lineTwo {
        font-size: 13px;
        font-weight: 800;
      }
    }

    .basket {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      position: relative;
      color:white;

      .basketCount {
        background-color: #ffd700;
        color: #111;
        padding: 2px 5px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 768px) {
    .logo {
      width: 80px;
    }
    .nav {
      .option {
        margin: 5px 10px;
      }
    }
  }
`;
const Header = () => {
  const [name, setName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await getUser();
    return response.status === "success" ? response.name : "";
  };
  
  const fetchCart = async () => {
    const response = await getCart();
    return response.status === "success" ? response.data : [];
  };
  
  const fetchAddress = async () => {
    const response = await getAddress();
    return response.status === "success" ? response.data : {};
  };

  const fetchData = async () => {
    const authToken = localStorage.getItem("authtoken");
    if (authToken) {
      const userName = await fetchUser();
      setName(userName);
      dispatch(setToUser({ name: userName }));
      const address = await fetchAddress();
      dispatch(setToAddress({ address }));
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await fetchCart();

      if (name && cartCount !== 0 && cartData.length !== 0) {
        const { union, difference } = mergeCart(cartData, cart);
        dispatch(resetCart());
        if (union.length!==0) dispatch(setCart({ cartItems: union }));
        if (difference.length!==0) await bulkPostCart(difference);
      } else if (name && cartCount !== 0 && cartData.length === 0) {
        await bulkPostCart(cart);
      } else if (name && cartCount === 0 && cartData.length !== 0) {
        dispatch(setCart({ cartItems: cartData }));
      }
    };

    if (name!=="") {
      fetchCartData();
      console.log("count")
    }
    // eslint-disable-next-line
  },[name]);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const handleAuthentication = () => {
    if (name) {
      localStorage.removeItem("authtoken");
      setName("");
      dispatch(resetUser());
      dispatch(resetCart());
      dispatch(resetAddress());
    }
  };

  return (
    <HeaderContainer>
      {/* Amazon logo */}
      <Link to="/">
        <img src={logo} alt="Amazon logo" className="logo" />
      </Link>

      {/* Navigation options */}
      <div className="nav">
        {/* Option: Sign In */}
        <Link
          to={!name && "/login"}
          className="option"
          onClick={handleAuthentication}
        >
          <span className="lineOne">Hello {name!=="" ? name.split(" ")[0] : "Guest"}</span>
          <span className="lineTwo">{name ? "Sign Out" : "Sign in"}</span>
        </Link>

        {/* Option: Returns and Orders */}
        <Link to="/order" className="option">
          <span className="lineOne">Returns</span>
          <span className="lineTwo">& Orders</span>
        </Link>

        {/* Shopping basket */}
        <Link to="/checkout" className="basket">
          <ShoppingBasketIcon />
          <span className="basketCount">{cartCount}</span>
        </Link>
      </div>
    </HeaderContainer>
  );
};

export default Header;