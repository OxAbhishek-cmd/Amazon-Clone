// Redux/Slice/index.js
import { combineReducers } from "redux";
import basketReducer from "./cartSlice";
import userReducer from "./userSlice";
import addressReducer from "./addressSlice";

const rootReducer = combineReducers({
  cart: basketReducer,
  user: userReducer,
  address: addressReducer,
});

export default rootReducer;
