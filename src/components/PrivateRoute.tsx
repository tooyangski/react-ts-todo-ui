import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/auth";
import { CircularProgress } from "@mui/material";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <CircularProgress />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
