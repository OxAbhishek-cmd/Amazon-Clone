import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
  const [{host}, dispatch] = useStateValue();
  const getuser = async () => {
    if (!localStorage.getItem("auth")) {
      const response = await fetch(`${host}/credentials/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("auth")
        },
      });

      const data = await response.json(); // Await the JSON parsing
      if (data) {
        dispatch({
          type: "SET_USER",
          user: data.results,
        });
      }
    }
  };
  getuser();
  const navigate = useNavigate();
  return (
    <Router>
      {navigate !== "/login" && navigate !== "/register" && <Header />}
      <Routes>
        {/* Default Route (Home) */}
        <Route exact path="/" element={<Home />} />
        
        {/* Route for Login */}
        <Route exact path="/login" element={<Login />} />

        {/* Route for Registration */}
        <Route exact path="/register" element={<Registration />} />

        {/* Route for Checkout */}
        <Route exact path="/checkout" element={<Checkout />} />

        {/* Route for Address */}
        <Route exact path="/address" element={<Address />} />

        {/* Route for Payment */}
        <Route exact path="/payment" element={<Payment />} />

        {/* Route for order*/}
        <Route exact path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
