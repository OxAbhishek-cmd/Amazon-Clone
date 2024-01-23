// API/address.js
import { DOMAIN } from "../AdditionalFunction";
const host = `${DOMAIN}/address`
export const postAddress = async (address) => {
    const response = await fetch(`${host}/postaddress`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify(address),
    });
    const data = await response.json();

    if (data.status === "success")
        return { status: "success" };
    return { status: "error", message: "Something went wrong" }
}

export const getAddress = async () => {
    const response = await fetch(`${host}/getaddress`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken"),
        },
    });
    const data = await response.json();
    return data;
}
