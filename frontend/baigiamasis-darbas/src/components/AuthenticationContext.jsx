import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationWrapper = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  //true
  const handleAuthentication = (data) => setIsSignedIn(data);

  return (
    <AuthenticationContext.Provider
      value={{ isSignedIn, setIsSignedIn: handleAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// 2 var

// import React, { createContext, useState } from "react";

// export const AuthenticationContext = createContext();

// export const AuthenticationProvider = ({ children }) => {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   return (
//     <AuthenticationContext.Provider value={{ isSignedIn, setIsSignedIn }}>
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };