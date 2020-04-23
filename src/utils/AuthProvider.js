import React from "react";

export const AuthContext = React.createContext();
export const basicAuthStorageKey = "basicAuthToken";
export const hostStorageKey = "hostName";
export const usernameStorageKey = "username";

export default function AuthProvider({ children }) {
  const [basicAuth, setBasicAuth] = React.useState({
    basicAuth: undefined,
    host: undefined,
    username: undefined,
  });

  const setAuth = (basicAuthCode, host, username) => {
    setBasicAuth(basicAuthCode);
    localStorage.setItem(basicAuthStorageKey, basicAuthCode);
    localStorage.setItem(hostStorageKey, host);
    localStorage.setItem(usernameStorageKey, username);
  };

  React.useEffect(() => {
    const basicAuthFromStorage = localStorage.getItem(basicAuthStorageKey);
    const hostFromStorage = localStorage.getItem(hostStorageKey);
    const usernameFromStorage = localStorage.getItem(usernameStorageKey);
    if (
      window.location.pathname !== "/login" &&
      (!basicAuthFromStorage || !hostFromStorage || !usernameFromStorage)
    ) {
      if (window.location.pathname === "/") {
        window.location.assign("/login");
      } else {
        window.location.assign(`/login?redirect=${window.location.pathname}`);
      }
    } else if (
      window.location.pathname === "/login" &&
      basicAuthFromStorage &&
      hostFromStorage &&
      usernameFromStorage
    ) {
      window.location.assign("/");
    }
    setBasicAuth({
      basicAuth: basicAuthFromStorage,
      host: hostFromStorage,
      username: usernameFromStorage,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ basicAuth, setBasicAuth: setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
