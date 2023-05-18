import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { AuthenticationContext } from "./AuthenticationContext";

export const NavBar = ({ isLoading, onLogout }) => {
  const { isDarkTheme, changeTheme } = useContext(ThemeContext);
  const { isSignedIn } = useContext(AuthenticationContext);

  if (isLoading) {
    return;
  }

  return (
    <NavBar isDark={isDarkTheme}>
      <ul>
        {isSignedIn ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      {isSignedIn && <button onClick={onLogout}>LOGOUT</button>}
      <button onClick={changeTheme}></button>
    </NavBar>
  );
};
