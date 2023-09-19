// action/counterActions.js
// Action creators related to user
export const fetchUser = () => ({
  type: "FETCH_USER",
});
export const deleteUser = () => ({
  type: "DELETE_USER",
});

// Action creators related to user's address
export const setAddress = (address) => ({
  type: "SET_ADDRESS",
  address,
});
export const fetchAddress = () => ({
  type: "FETCH_ADDRESS",
});
export const emptyAddress = () => ({
  type: "EMPTY_ADDRESS",
});

// Action creators related to the shopping basket
export const addToBasket = (item) => ({
  type: "ADD_TO_BASKET",
  item,
});
export const removeFromBasket = (product_id) => ({
  type: "REMOVE_FROM_BASKET",
  product_id,
});
export const updateInBasket = (product_id, quantity) => ({
  type: "UPDATE_QUANTITY",
  product_id,
  quantity,
});
export const fetchBasket = () => ({
  type: "FETCH_CART",
});
export const emptyBasket = () => ({
  type: "EMPTY_CART",
});

export const totalAmount = (basket) => {
  return basket?.reduce(
    (amount, item) => item.quantity * item.price + amount,
    0
  );
};
