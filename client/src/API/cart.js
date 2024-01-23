// API/cart.js
import { DOMAIN } from "../AdditionalFunction";

const host = `${DOMAIN}/cart`;

export const getCart = async () => {
  try {
    const response = await fetch(`${host}/getcart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during cart data fetch:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};

export const postCart = async (product_id,quantity) => {
  try {
    const response = await fetch(`${host}/postcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({product_id,quantity}),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    const data = await response.json();
    if (data.status === "success") {
      return { status: "success", message: "Item added to cart successfully" };
    }

    return { status: "error", message: "Error adding item to cart" };
  } catch (error) {
    console.error("Error during item addition to cart:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};

export const deletecart = async (product_id) => {
  try {
    const response = await fetch(`${host}/deletecart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ product_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete item from cart");
    }

    const data = await response.json();
    if (data.status === "success") {
      return { status: "success", message: "Item deleted from cart successfully" };
    }

    return { status: "error", message: "Error deleting item from cart" };
  } catch (error) {
    console.error("Error during item deletion from cart:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};

export const putCart = async (product_id, quantity) => {
  try {
    const response = await fetch(`${host}/putcart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ product_id, quantity }),
    });


    const data = await response.json();
    if (data.status === "success") {
      return { status: "success", message: "Cart item updated successfully" };
    }
    
    return { status: "error", message: "Error updating item in cart" };
  } catch (error) {
    console.error("Error during cart item update:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};

export const bulkPostCart = async (cartList) => {
  try {
    const response = await fetch(`${host}/bulkpostcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ cartItems: cartList }),
    });

    if (!response.ok) {
      throw new Error("Failed to merge cart items");
    }

    const data = await response.json();
    if (data.status === "success") {
      return { status: "success", message: "Cart items merged successfully" };
    }

    return { status: "error", message: "Error merging cart items" };
  } catch (error) {
    console.error("Error during cart item merge:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};