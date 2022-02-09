import axios from "axios";

const API_URL = "/api/users/"; //setting our endpoint from backend into a variable

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData); // collecting the response from the backend endpoint we created

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); //we puting it inside the localstorage
  }

  return response.data; //returning the user details back for
};

//Logout user
const logout = () => localStorage.removeItem("user");

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData); // collecting the response from the backend endpoint we created

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); //we puting it inside the localstorage
  }

  return response.data; //returning the user details back for
};

// putting each service in an object
const authService = {
  register,
  logout,
  login,
};

export default authService;
