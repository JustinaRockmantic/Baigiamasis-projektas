import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./components/Homepage";
import { List } from "./components/List";
import Protected from "./components/Protected";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./components/AuthenticationContext";

function App() {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  const handleNavigate = (path) => {
    if (!isLoading) {
      if (isSignedIn) {
        navigate(path);
      } else {
        navigate("/register");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <NavBar
        isLoading={isLoading}
        onLogout={handleLogout}
        isSignedIn={isSignedIn}
        navigate={handleNavigate}
      />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          element={
            <Protected isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        >
          <Route path="/" element={<Homepage />} />
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  );
}

export default AppWrapper;
