import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress } from "../actions/counterActions";

const Div = styled.div`
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .shipping {
    background-color: white;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 18px;
      margin-bottom: 20px;
    }

    form {
      select,
      input[type="text"],
      input[type="tel"],
      input[type="number"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box; /* Ensure padding and border are included in width */
      }

      .extra {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        div {
          flex: 1 1 calc(33.33% - 10px);
        }
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #ff9900;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ff8c00;
      }
    }
  }
`;

const Address = () => {
  const navigate = useNavigate();
  // State variables to hold data
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Handle country selection
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const mergeaddress = [addressLine1, addressLine2].join("&&");
  const dispatch = useDispatch();
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      setAddress({
        Country: selectedCountry,
        fullName,
        phoneNumber,
        Address: mergeaddress,
        city,
        state,
        zipCode,
      })
    );
    navigate("/payment");
  };

  return (
    <Div>
      <div className="shipping">
        <h1>Add a new address</h1>
        <form onSubmit={handleSubmit}>
          {/* Country/Region Dropdown */}
          <h5>Country/Region</h5>
          <select
            name="country"
            id=""
            required
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="" disabled selected>
              Select your country
            </option>
            <option value="India">India</option>
          </select>

          {/* Full Name */}
          <h5>Full name</h5>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* Phone Number */}
          <h5>Phone number</h5>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          {/* Address */}
          <h5>Address</h5>
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />

          {/* City */}
          <div className="extra">
            <div>
              <h5>City</h5>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            {/* State/Region Dropdown */}
            <div>
              <h5>State/Region</h5>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            {/* Zip Code */}
            <div>
              <h5>Zip Code</h5>
              <input
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                maxLength={6}
                minLength={6}
                required
              />
            </div>
          </div>

          {/* Default Address Checkbox */}
          <p>
            <input type="checkbox" name="" id="" />
            Mark this my default address
          </p>

          {/* Submit Button */}
          <button type="submit">Add Address</button>
        </form>
      </div>
    </Div>
  );
};

export default Address;
