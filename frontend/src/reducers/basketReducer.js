// reducers/basketReducer.js
const initialState = {
  basket: [],
  count: 0,
};

const host = "http://localhost:5000";

const basketReducer = async (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      // Send a POST request to add the item to the cart on the server
      try {
        if (localStorage.getItem("auth")) {
          await fetch(`${host}/api/cart/postcart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth"),
            },
            body: JSON.stringify({
              product_id: action.item.product_id,
              quantity: action.item.quantity,
            }),
          });
        }
        // Update the Redux state by adding the item to the basket
        return {
          ...state,
          basket: [...state.basket, action.item], // Ensure immutability
          count: state.count + 1,
        };
      } catch (error) {
        console.error("Error adding to basket:", error);
        return state; // Return the current state on error
      }

    case "REMOVE_FROM_BASKET":
      // Find the index of the item to remove in the basket
      const removeIndex = state.basket.findIndex(
        (item) => item.product_id === action.product_id
      );

      if (removeIndex >= 0) {
        // Create a new basket without the removed item
        const newBasket = [...state.basket];
        newBasket.splice(removeIndex, 1);

        if (localStorage.getItem("auth")) {
          try {
            await fetch(`${host}/api/cart/deletecart`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth"),
              },
              body: JSON.stringify({ product_id: action.product_id }),
            });
          } catch (error) {
            console.error("Error removing from basket:", error);
            return state; // Return the current state on error
          }
        }

        // Update the Redux state with the new basket
        return {
          ...state,
          basket: newBasket,
          count: state.count - 1,
        };
      } else {
        console.warn(
          `Can't remove the product (id: ${action.product_id}) as it's not in the basket!`
        );
        return state;
      }

    // Action for updating the quantity of an item in the basket
    case "UPDATE_QUANTITY":
      // Find the index of the item to update in the basket
      const updateIndex = state.basket.findIndex(
        (item) => item.product_id === action.product_id
      );

      if (updateIndex >= 0) {
        // Update the quantity of the item in the basket
        const updatedBasket = [...state.basket];
        updatedBasket[updateIndex].quantity = action.quantity;

        if (localStorage.getItem("auth")) {
          await fetch(`${host}/api/cart/putcart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth"),
            },
            body: JSON.stringify({
              product_id: action.product_id,
              quantity: action.quantity,
            }),
          });
        }
        // Update the Redux state with the new basket
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        // If the item to update is not found in the basket, issue a warning and return the current state
        console.warn(
          `Can't update the quantity for product (id: ${action.product_id}) as it's not in the basket!`
        );
        return state;
      }

    // Action for fetching the cart data from the server
    case "FETCH_CART":
      try {
        const response = await fetch(`${host}/api/cart/getcart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();

        // Update the Redux state with the fetched cart data
        return {
          basket: data.data,
          count: data.data.length,
        };
      } catch (error) {
        // Handle errors when fetching cart data and return the current state
        console.error("Error fetching cart:", error);
        return state;
      }

    // Action for emptying the cart
    case "EMPTY_CART":
      return {
        ...initialState,
      };

    default:
      return state; // Return the current state if the action is not recognized
  }
};

export default basketReducer;
