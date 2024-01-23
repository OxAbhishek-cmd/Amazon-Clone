import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Contries from "../../Countries.json";
import { setToAddress } from "../../Redux/Slice/addressSlice";
import { postAddress } from "../../API/address";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .shipping {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;

    h1 {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    h5 {
      text-align: left;
      margin: 10px 0;
    }

    input {
      width: 95%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #007185;
    }

    button {
      width: 100%;
      height: 40px;
      background-color: #f0c14b;
      border: 1px solid #a88734 #9c7e31 #846a29;
      color: #111;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #ddb347;
    }

    .extra {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      input {
        width: 84%;
      }
    }

    .default-address {
      display: flex;
      align-items: center;
      margin-top: 10px;

      input {
        width:auto;
        margin: 0px 5px 5px 0px;
      }
    }
  }
`;

const Address = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("authtoken");
  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  },[user,navigate])
  // State variables to hold data
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const options = Contries;
  // Handle country selection
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
  };
  const mergeaddress = [addressLine1, addressLine2];
  const dispatch = useDispatch();
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = {
      fullName,
      phoneNumber,
      Address: mergeaddress,
      city,
      state,
      Country: selectedCountry,
      zipCode,
    };
    await postAddress(address);
    dispatch(setToAddress({ address }));
    navigate("/payment");
  };
  const handleCheckboxClick = () => {
    const checkbox = document.getElementById("defaultAddressCheckbox");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  };
  return (
    <Div>
      <div className="shipping">
        <h1>Add a new address</h1>
        <form onSubmit={handleSubmit}>
          {/* Country/Region Dropdown */}
          <h5>Country/Region</h5>
          <SearchableSelect options={options} onChange={handleCountryChange} />

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
          <div className="default-address">
            <input type="checkbox" name="" id="defaultAddressCheckbox" onClick={handleCheckboxClick}/>
            <p onClick={handleCheckboxClick}>Mark this my default address</p>
          </div>

          {/* Submit Button */}
          <button type="submit">Add Address</button>
        </form>
      </div>
    </Div>
  );
};

export default Address;

const SearchableSelect = ({ options, onChange }) => {
  return (
    <Select
      options={options}
      isSearchable
      placeholder="Select your Country"
      onChange={onChange}
    />
  );
};
