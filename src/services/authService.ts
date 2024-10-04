import { User } from "../types/User";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "/auth";

const signup = async (user: User): Promise<void> => {
  const response = await axiosInstance.post(`${API_URL}/signup`, user);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: User): Promise<string> => {
  const response = await axiosInstance.post(`${API_URL}/signin`, user);
  if (response.data) {
    localStorage.setItem("token", response.data);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

// register every API call to authService
const authService = {
  signup,
  logout,
  login,
};

export default authService;
