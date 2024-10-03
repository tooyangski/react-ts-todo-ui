import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export enum AuthType {
  LOGIN = "Login",
  SIGNUP = "Sign-up",
}

interface HintProps {
  redirectType: AuthType;
  route: string;
}

const Hint = ({ redirectType, route }: HintProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1em",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <span>
        {redirectType === AuthType.LOGIN
          ? "Not yet registered?"
          : "Already registered?"}
      </span>
      <Link to={route}>{redirectType}</Link>
    </Box>
  );
};

export default Hint;
