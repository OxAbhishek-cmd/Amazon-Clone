import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import banner from "../Logo/banner.jpg";
import { Items } from "../../API/product";

const Div = styled.div`
  .home__container {
    position: relative;
    width:auto;
    margin: 0 auto;
  }

  .home__image {
    margin: auto;
    width: 90%;
    z-index: -1;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .home__row {
    display: grid;
    gap:5px;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    margin: 15px;
    @media screen and (max-width: 768px) {
      grid-template-columns: auto auto; /* Two items in one row for mobile */
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: auto; /* One item in one row for smaller mobile screens */
    }
  }

  .home__item {
    margin: 15px;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const Home = () => {
  const [items, setItems] = useState([]);

  const fetchProduct = async () => {
    const responceProduct = await Items();
    setItems(responceProduct);
  };

  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Div>
      <div className="home__container">
        <img className="home__image" src={banner} alt="" />
        <div className="home__row">
          {items.map((product) => (
            <div className="home__item" key={product.product_id}>
              <Product
                product_id={product.product_id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </Div>
  );
};

export default Home;