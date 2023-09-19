// reducers/userReducer.js
const initialState = {
  user: "Abhishek",
};

const host = "http://localhost:5000";

const userReducer = async (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      localStorage.removeItem("auth");
      // Return a new state object with the user reset to the initial value
      return {
        ...initialState,
      };
    case "FETCH_USER":
      try {
        const response = await fetch(`${host}/api/credentials/getuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        // Return a new state object with the user data updated
        return {
          user: data.data.name,
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
        return state; // Return the current state on error
      }
    default:
      return state;
  }
};

export default userReducer;
