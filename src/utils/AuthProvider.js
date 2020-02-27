import React from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [basicAuth, setBasicAuth] = React.useState();
  const setBasicAuthAndCookie = (basicAuthCode) => {
    setBasicAuth(basicAuthCode);
    // set cookie
  };
  return (
    <AuthContext.Provider value={{ basicAuth, setBasicAuth: setBasicAuthAndCookie }}>
      {children}
    </AuthContext.Provider>
  );
}
