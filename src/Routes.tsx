import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import { AuthType } from "./components/Hint";
import Todos from "./components/todo/Todos";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Todos />,
      },
    ],
  },
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
