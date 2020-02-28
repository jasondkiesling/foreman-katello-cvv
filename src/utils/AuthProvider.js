import React from "react";

import { getCookie, setCookie } from "./CookieUtils";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [basicAuth, setBasicAuth] = React.useState();
  const [user, setUser] = React.useState({ firstName: "", lastName: "" });

  const basicAuthCookieName = "basicAuthToken";
  const setBasicAuthAndCookie = (basicAuthCode, cookieTimeLength = 0) => {
    setBasicAuth(basicAuthCode);
    setCookie(basicAuthCookieName, basicAuthCode, cookieTimeLength);
  };

  React.useEffect(() => {
    if (window.location.pathname !== "/login" && !getCookie(basicAuthCookieName)) {
      window.location.assign("/login");
    } else if (window.location.pathname === "/login" && getCookie(basicAuthCookieName)) {
      window.location.assign("/");
    }
    setBasicAuth(getCookie(basicAuthCookieName));
  }, []);   //eslint-disable-line

  return (
    <AuthContext.Provider value={{
      basicAuth, setBasicAuth: setBasicAuthAndCookie, user, setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
