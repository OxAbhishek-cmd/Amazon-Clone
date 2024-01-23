// API/product.js
import { DOMAIN } from "../AdditionalFunction";
const host = `${DOMAIN}/items`;
export const Items = async () => {
    const response = await fetch(host, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    data.data.forEach(element => {
        element.price = parseFloat(element.price)
    });
    return data.data;
}