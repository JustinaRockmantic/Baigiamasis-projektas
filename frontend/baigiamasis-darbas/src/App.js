import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./components/Homepage";
import { List } from "./components/List";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./components/Authentication";

export const ThemeContext = createContext();

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { setIsSignedIn } = useContext(AuthenticationContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, changeTheme: () => setIsDarkTheme(!isDarkTheme) }}
    >
      <NavBar onLogout={handleLogout} />

      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/register" />
        <Route element={<List />} path="/list" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
