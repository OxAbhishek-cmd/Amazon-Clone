import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Checkout from "./Components/Checkout/Checkout";
import Address from "./Components/Address/Address";
import Payment from "./Components/Payment/Payment";
import Order from "./Components/Order/Order";
function App() {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<><Header /><Home /></>}/>

        <Route exact path="/register" element={<Registration />} />
        
        <Route exact path="/login" element={<Login />} />

        <Route  exact  path="/checkout"  element={<><Header /><Checkout /></>}/>

        <Route exact path="/address" element={<><Header /><Address /></>} />

        <Route exact path="/payment" element={<><Header /><Payment /></> } />

        <Route exact path="/order" element={<><Header /><Order /></>} />
      </Routes>
    </Router>
  );
}

export default App;
