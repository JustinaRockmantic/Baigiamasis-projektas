import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthenticationContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
