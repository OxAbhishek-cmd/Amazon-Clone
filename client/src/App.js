import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Login = lazy(()=>import("./Components/Credentials/Login"));
const Registration =lazy(()=>import("./Components/Credentials/Registration"))
const Header =lazy(()=>import("./Components/Header"));
const Home =lazy(()=>import("./Components/Home/Home"));
const Checkout =lazy(()=>import("./Components/Checkout/Checkout"));
const Address =lazy(()=>import("./Components/Address/Address"));
const Payment =lazy(()=>import("./Components/Payment/Payment"));
const Order =lazy(()=>import("./Components/Order/Order"));
const OrderPreview =lazy(()=>import("./Components/OrderPreview/OrderPreview"));
const NotFound =lazy(()=>import("./Components/404/NotFound"));

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route exact path="/login" element={<Login />} />

        {/* Registration Route */}
        <Route exact path="/register" element={<Registration />} />

        {/* Home Route */}
        <Route exact path="/" element={<><Header /><Home /></>} />

        {/* Checkout Route */}
        <Route exact path="/checkout" element={<><Header /><Checkout /></>} />

        {/* Address Route */}
        <Route exact path="/address" element={<><Header /><Address /></>} />

        {/* Payment Route */}
        <Route exact path="/payment" element={<><Header /><Payment /></>} />

        {/* Order Route */}
        <Route exact path="/order" element={<><Header /><Order /></>} />

        {/* Order Preview Route */}
        <Route exact path="/order/:id" element={<><Header /><OrderPreview /></>} />
        
        {/* 404 Not Found Route */}
        <Route path="*" element={<><Header /><NotFound/></>} />
      </Routes>
    </Router>
  );
}

export default App;
