import axios from "axios";
export const BACKEND_BASE_URL = "http://localhost:3000";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
