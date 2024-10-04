import { Button, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, signup, reset } from "../reducers/authSlice";
import { User } from "../types/User";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { AuthType } from "./Hint";

type Credentials = {
  email: string;
  password: string;
};

interface AuthFormProps {
  submitLabel: string;
  onSubmit: (credentials: Credentials) => Promise<void>;
  children: React.ReactNode;
  authType: AuthType;
}

const AuthForm = ({
  submitLabel,
  onSubmit,
  children,
  authType,
}: AuthFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { token, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // if signup is error, create a toast
    if (isError) {
      if (Array.isArray(message)) {
        toast.error(message[0]);
      } else if (message) {
        toast.error(message);
      }
    }

    // redirect when logged in if success
    if (isSuccess && authType !== AuthType.LOGIN) {
      toast.success("You are authenticated.");
      navigate("/");
    } else if (isSuccess && authType !== AuthType.SIGNUP) {
      toast.success("Success. Please login.");
      navigate("/login");
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message, token, authType]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const user: User = {
      email,
      password,
    };

    if (authType !== AuthType.LOGIN) {
      dispatch(login(user));
    } else {
      dispatch(signup(user));
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "30%",
          cd: "70%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isLoading ? (
        <LoadingButton loading loadingIndicator="Loading…" variant="outlined" />
      ) : (
        <Button variant="outlined" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      )}

      {children}
    </Stack>
  );
};

export default AuthForm;
