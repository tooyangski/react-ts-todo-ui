import { User } from "../types/User";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "/auth";

// register user API
const register = async (user: User): Promise<void> => {
  const response = await axiosInstance.post(`${API_URL}/signup`, user);
  console.log("response: ", response);
  // wrap the response.data because localStorage can only hold string.
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: User): Promise<string> => {
  const response = await axiosInstance.post(`${API_URL}/signin`, user);
  console.log("response: ", response);
  // wrap the response.data because localStorage can only hold string.
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

// register every API call to authService
const authService = {
  register,
  logout,
  login,
};

export default authService;
