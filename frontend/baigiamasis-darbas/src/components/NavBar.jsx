import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "./AuthenticationContext";

export const NavBar = ({ isLoading, onLogout }) => {
  const { isSignedIn } = useContext(AuthenticationContext);

  if (isLoading) {
    return null;
  }

  const navStyle = {
    backgroundColor: "lightgrey",
    padding: "10px",
  };

  const ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "18px",
  };

  const partyEmojiStyle = {
    fontSize: "20px",
  };

  const buttonStyle = {
    backgroundColor: "lightpink",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  };

  const logoutContainerStyle = {
    marginLeft: "auto",
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {isSignedIn ? (
          <>
            <li>
              <Link to="/" style={linkStyle}>
                Pradinis puslapis
              </Link>
            </li>
            <li>
              <span style={partyEmojiStyle}>🎉</span>
            </li>
            <li>
              <Link to="/list" style={linkStyle}>
                Svečių sąrašas
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={linkStyle}>
                Prisijungti
              </Link>
            </li>
            <li>
              <Link to="/register" style={linkStyle}>
                Registruotis
              </Link>
            </li>
          </>
        )}
        {isSignedIn && (
          <li style={logoutContainerStyle}>
            <button onClick={onLogout} style={buttonStyle}>
              ATSIJUNGTI
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
