import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./components/Homepage";
import { List } from "./components/List";
import Protected from "./components/Protected";
import React, { useContext, useState, useEffect } from "react";

import { AuthenticationContext } from "./components/AuthenticationContext";

function App() {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };
  return (
    <>
      <NavBar isLoading={isLoading} onLogout={handleLogout} />

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

export default App;
