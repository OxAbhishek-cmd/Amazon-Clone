export const initialState = {
  basket: [],
  user: null,
  address: {},
  host: "https:localhost:5000/api",
};

// Selector
export const getbasketTotal = (basket) => {
  return basket?.reduce(
    (amount, item) => (item.quantity * item.price) + amount, 0);
};

export const getUser = () => {
  return initialState.user;
};

export const getAddress = () => {
  return initialState.address;
};

export const getOrder = () => {
  return initialState.order;
};

const reducer = async (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      await fetch(`${initialState.host}/cart/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth"),
        },
        body: JSON.stringify({ product_id: action.item.id ,quantity:action.item.quantity}),
      });
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newbasket = [...state.basket];

      if (index >= 0) {
        newbasket.splice(index, 1);
        await fetch(`${initialState.host}/cart/item`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth"),
          },
          body: JSON.stringify({ product_id: action.id }),
        });
      } else {
        console.warn(
          `Can't remove the product (id : ${action.id}) as it's not in the basket!`
        );
      }
      return {
        ...state,
        basket: newbasket,
      };
    case "SET_USER":
      const fetchAddress = await fetch(`${initialState.host}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth"),
        },
      });

      const fetchcart = await fetch(`${initialState.host}/cart/get`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth"),
        },
      });
      return {
        ...state,
        user: action.user,
        address: await fetchAddress.json(),
        basket: await fetchcart.json(),
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
        address: {},
        basket: [],
      };
    case "ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "UPDATE_QUANTITY":
      const coord = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      state.basket[coord].quantity = action.quantity;
      let newwbasket = [...state.basket];
      newwbasket[coord].quantity = action.quantity;
      if (state.basket[coord].quantity !== action.quantity) {
        await fetch(`${initialState.host}/item`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth"),
          },
          body: JSON.stringify({ product_id: action.id, quantity: action.quantity }),
        });
      }
      return {
        ...state,
        basket: newwbasket,
      };
    case "SET_ADDRESS":
      await fetch(`${initialState.host}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth"),
        },
        body: JSON.stringify(action.add)
      });
      return{
        ...state,
        address:action.add
      }

    default:
      return state;
  }
};

export default reducer;
