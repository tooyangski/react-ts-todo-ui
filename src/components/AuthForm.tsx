import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type Credentials = {
  email: string;
  password: string;
};

interface AuthFormProps {
  submitLabel: string;
  onSubmit: (credentials: Credentials) => Promise<void>;
  children: React.ReactNode;
}

const AuthForm = ({ submitLabel, onSubmit, children }: AuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      <Button variant="outlined" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default AuthForm;
