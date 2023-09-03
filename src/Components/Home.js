import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
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

  const dataFetch = async () => {
    const response = await fetch("http://localhost:5000/api/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataFetch();
      setItem(fetchedData);
    };
    fetchData();
  }, []);
  return (
    <Div>
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id={item[0].id}
            key={item[0].id}
            title={item[0].title}
            price={item[0].price}
            rating={item[0].rating}
            image={item[0].image}
          />
          <Product
            id={item[1].id}
            key={item[1].id}
            title={item[1].title}
            price={item[1].price}
            rating={item[1].rating}
            image={item[1].image}
          />
        </div>

        <div className="home__row">
          <Product
            id={item[2].id}
            key={item[2].id}
            title={item[2].title}
            price={item[2].price}
            rating={item[2].rating}
            image={item[2].image}
          />
          <Product
            id={item[3].id}
            key={item[3].id}
            title={item[3].title}
            price={item[3].price}
            rating={item[3].rating}
            image={item[3].image}
          />
          <Product
            id={item[4].id}
            key={item[4].id}
            title={item[4].title}
            price={item[4].price}
            rating={item[4].rating}
            image={item[4].image}
          />
        </div>

        <div className="home__row">
          <Product
            id={item[5].id}
            key={item[5].id}
            title={item[5].title}
            price={item[5].price}
            rating={item[5].rating}
            image={item[5].image}
          />
        </div>
      </div>
    </Div>
  );
};

export default Home;
