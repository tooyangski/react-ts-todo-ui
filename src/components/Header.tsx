import { Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout, reset } from "../reducers/authSlice";
import { redirect } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    redirect("/");
  };

  return (
    <header className="header">
      <nav className="menu">
        <ul>
          {token ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign-up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
