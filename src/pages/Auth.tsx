import React from "react";
import AuthForm from "../components/AuthForm";
import Hint, { AuthType } from "../components/Hint";

interface AuthProps {
  label: string;
  redirectType: AuthType;
  redirectRoute: string;
}

const Auth = ({ label, redirectType, redirectRoute }: AuthProps) => {
  return (
    <AuthForm
      authType={redirectType}
      submitLabel={label}
      onSubmit={async () => {}}
    >
      <Hint redirectType={redirectType} route={redirectRoute} />
    </AuthForm>
  );
};

export default Auth;
