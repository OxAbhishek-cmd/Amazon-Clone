import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Payment from "./Components/Payment";
import Order from "./Components/Orders";
import Address from "./Components/Address";
import { useStateValue } from "./StateProvider";



function App() {
  const [, dispatch] = useStateValue();
  const getuser=async ()=>{
    if(!localStorage.getItem("auth")){
      const response = await fetch("http://localhost/api/credentials/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      const data = await response.json(); // Await the JSON parsing
      if(data){
        dispatch({
          type:'SET_USER',
          user:data.results
        })
      }
    }

  }
  getuser();
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route exact path="/login" element={<Login />} />
        
        {/* Route for order*/}
        <Route exact path="/order" element={<><Header /><Order /></>} />
        
        {/* Route for Address */}
        <Route exact path="/address" element={<><Header /><Address /></>} />

        {/* Route for Registration */}
        <Route exact path="/register" element={<Registration />} />

        {/* Route for Checkout */}
        <Route exact path="/checkout" element={<><Header /><Checkout /></>} />

        {/* Route for Payment */}
        <Route exact path="/payment" element={<><Header /><Payment /></>} />

        {/* Default Route (Home) */}
        <Route exact path="/" element={<><Header /><Home /></>} />
      </Routes>
    </Router>
  );
}

export default App;
