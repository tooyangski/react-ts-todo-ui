import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { AuthType } from "./components/Hint";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: (
      <Auth
        label="Login"
        redirectType={AuthType.SIGNUP}
        redirectRoute="/signup"
      />
    ),
  },
  {
    path: "/signup",
    element: (
      <Auth
        label="Sign-up"
        redirectType={AuthType.LOGIN}
        redirectRoute="/login"
      />
    ),
  },
]);

export default router;
