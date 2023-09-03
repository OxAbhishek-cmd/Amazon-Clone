import React from "react";
import logo from "./Logo/amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

// Styled component for the header
const Div = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;

  /* Styling for the Amazon logo */
  .logo {
    width: 100px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 18px;
  }

  /* Styling for the search bar */
  .search {
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 24px;

    /* Styling for the search input */
    .searchInput {
      height: 12px;
      padding: 10px;
      border: none;
      width: 100%;
    }

    /* Styling for the search icon */
    .searchIcon {
      padding: 5px;
      height: 22px;
      background-color: #cd9042;
    }
  }

  /* Styling for the navigation options */
  .nav {
    display: flex;
    justify-content: space-evenly;

    /* Styling for each individual option */
    .option {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      margin-right: 10px;
      color: white;
      text-decoration: none;

      /* Styling for the first line of the option */
      .lineOne {
        font-size: 10px;
      }

      /* Styling for the second line of the option */
      .lineTwo {
        font-size: 13px;
        font-weight: 800;
      }
    }

    /* Styling for the shopping basket */
    .basket {
      display: flex;
      align-items: center;
      color: white;

      /* Styling for the basket count */
      .basketCount {
        font-size: 13px;
        font-weight: 800;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
`;

// Component for the header
const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      dispatch({
        type: "DELETE_USER"
      });
    }
  };
  return (
    <Div>
      {/* Amazon logo */}
      <Link to="/">
        <img src={logo} alt="Amazon logo" className="logo" />
      </Link>

      {/* Search bar */}
      <div className="search">
        <input type="text" className="searchInput" />
        <SearchIcon className="searchIcon" />
      </div>

      {/* Navigation options */}
      <div className="nav">
        {/* Option: Sign In */}

        <Link
          to={!user && "/login"}
          className="option"
          onClick={handleAuthentication}
        >
          <span className="lineOne">Hello {user?.name?user.name.split(" ")[0]:"Guest"}</span>
          <span className="lineTwo">{user ? "Sign Out" : "Sign in"}</span>
        </Link>

        {/* Option: Returns and Orders */}
        <Link to="/order" className="option">
          <span className="lineOne">Returns</span>
          <span className="lineTwo">& Orders</span>
        </Link>

        {/* Option: Your Prime */}
        <div className="option">
          <span className="lineOne">Your</span>
          <span className="lineTwo">Prime</span>
        </div>

        {/* Shopping basket */}
        <Link to="/checkout">
          <div className="basket">
            <ShoppingBasketIcon />
            <span className="basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </Div>
  );
};

export default Header;
