import React from "react";
import AuthForm from "../components/AuthForm";
import Hint, { AuthType } from "../components/Hint";

const Signup = () => {
  return (
    <AuthForm submitLabel="Signup" onSubmit={async () => {}}>
      <Hint redirectType={AuthType.SIGNUP} route={"/login"} />
    </AuthForm>
  );
};

export default Signup;
