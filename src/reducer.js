export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getbasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

export const getUser = () => {
  return initialState.user;
};

export const getAddress=(user)=>{
  return user.address;
}

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
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
      } else {
        console.warn(
          `Can't remove the product (id : ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newbasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        user: { ...state.user, address: action.address },
      };
    default:
      return state;
  }
};

export default reducer;
