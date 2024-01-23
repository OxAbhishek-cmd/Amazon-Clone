// API/order.js
import { DOMAIN } from "../AdditionalFunction";

const host = `${DOMAIN}/order`;

export const getOrder = async () => {
  try {
    const response = await fetch(`${host}/getorder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during order data fetch:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};

export const postOrder = async () => {
  try {
    const response = await fetch(`${host}/postorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      }
    });

    if (!response.ok) {
      throw new Error("Failed to create a new order");
    }

    const data = await response.json();
    if (data.status === "success") {
      return { status: "success", message: "New order created successfully", orderId:data.orderId };
    }

    return { status: "error", message: "Error creating a new order" };
  } catch (error) {
    console.error("Error during new order creation:", error);
    return { status: "error", message: "Something went wrong!" };
  }
};


export const orderbyId = async(orderId)=>{
  try {
    const response = await fetch(`${host}/orderbyid/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during order data fetch:", error);
    return { status: "error", message: "Something went wrong!" };
  }
}