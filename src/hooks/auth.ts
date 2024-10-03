import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface StateType {
  auth: {
    token: string;
  };
}

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { token } = useSelector((state: StateType) => state.auth);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [token]);

  return { loggedIn, checkingStatus };
};
