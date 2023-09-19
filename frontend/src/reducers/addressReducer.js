// Define action types as constants
const SET_ADDRESS = "SET_ADDRESS";
const FETCH_ADDRESS = "FETCH_ADDRESS";
const EMPTY_ADDRESS = "EMPTY_ADDRESS";

const host = "http://localhost:5000";
const initialState = {
  address: {},
};

const addressReducer = async (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      await fetch(`${host}/api/address/postaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth"),
        },
        body: JSON.stringify(action.address),
      });
      return {
        ...state,
        address: action.address,
      };
    case FETCH_ADDRESS:
      // Handle fetching address
      try {
        const response = await fetch(`${host}/api/address/getaddress`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth"),
          },
        });
        const data = await response.json();
        return {
          ...state,
          address: data[0],
        };
      } catch (error) {
        console.error("Error fetching address:", error);
        return state; // Return current state on error
      };
    case EMPTY_ADDRESS:
      // Handle emptying address
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default addressReducer;
