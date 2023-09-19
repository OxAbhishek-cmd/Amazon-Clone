import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import banner from "../Logo/banner.jpg";
const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;

  .home__container {
    .home__image {
      width: 100%;
      z-index: -1;
      margin-bottom: -365px;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
    }
  }
  .home__row {
    display: flex;
    z-index: 1;
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const Home = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/api/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setItem(data.data))
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const layer1 = item.slice(0, 2);
  const layer2 = item.slice(2, 4);
  const layer3 = item.slice(4, 5);
  return (
    <Div>
      <div className="home__container">
        <img className="home__image" src={banner} alt="" />

        <div className="home__row">
          {layer1?.map((product) => (
            <Product
              product_id={product.product_id}
              key={product.product_id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>

        <div className="home__row">
          {layer2?.map((product) => (
            <Product
              product_id={product.product_id}
              key={product.product_id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>

        <div className="home__row">
          {layer3?.map((product) => (
            <Product
              product_id={product.product_id}
              key={product.product_id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </Div>
  );
};

export default Home;
