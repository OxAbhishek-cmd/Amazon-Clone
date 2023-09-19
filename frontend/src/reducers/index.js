// reducers/index.js
import { combineReducers } from "redux";
import basketReducer from "./basketReducer";
import userReducer from "./userReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
  basketReducer,
  userReducer,
  addressReducer,
});

export default rootReducer;
