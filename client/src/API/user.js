// API/user.js
import { DOMAIN } from "../AdditionalFunction";

const host = `${DOMAIN}/credentials`;

export const login = async (email, password) => {
    try {
        const response = await fetch(`${host}/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        if (data.status === "success") {
            localStorage.setItem("authtoken", data.data.token);
            return { status: "success", message: "Login successful", name: data.data.name };
        } else {
            return { status: "error", message: data.error || "Invalid credentials" };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};

export const createAccount = async (name, email, password) => {
    try {
        const response = await fetch(`${host}/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error("Account creation failed");
        }

        const data = await response.json();
        if (data.status === "success") {
            localStorage.setItem("authtoken", data.data.authtoken);
            return { status: "success", message: "Account created successfully", name: name };
        } else {
            return { status: "error", message: data.error || "Error creating account" };
        }
    } catch (error) {
        console.error("Error during account creation:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};

export const getUser = async () => {
    try {
        const response = await fetch(`${host}/getuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("authtoken"),
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        if (data.status === "success") {
            return { status: "success", message: "User data fetched successfully", name: data.data.name };
        } else {
            return { status: "error", message: data.error || "Error fetching user data" };
        }
    } catch (error) {
        console.error("Error during user data fetch:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};

export const logout = async () => {
    try {
        localStorage.removeItem("authtoken");

        return { status: "success", message: "Logout successful" };
    } catch (error) {
        console.error("Error during logout:", error);
        return { status: "error", message: "Something went wrong!" };
    }
};













































