import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { AuthType } from "./components/Hint";
import Todo from "./components/todo/Todo";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Todo />,
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
