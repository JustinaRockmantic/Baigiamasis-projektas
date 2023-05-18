import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationWrapper = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const handleAuthentication = (data) => setIsSignedIn(data);

  return (
    <AuthenticationContext.Provider
      value={{ isSignedIn, setIsSignedIn: handleAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
