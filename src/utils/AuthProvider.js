import React from "react";

import { getCookie, setCookie } from "./CookieUtils";

export const AuthContext = React.createContext();
export const basicAuthCookieName = "basicAuthToken";
export const hostCookieName = "hostName";
export const usernameCookieName = "username";

export default function AuthProvider({ children }) {
  const [basicAuth, setBasicAuth] = React.useState(
    {
      basicAuth: undefined,
      host: undefined,
      username: undefined,
    },
  );

  const setAuthAndCookie = (basicAuthCode, host, username, cookieTimeLength = 0) => {
    setBasicAuth(basicAuthCode);
    setCookie(basicAuthCookieName, basicAuthCode, cookieTimeLength);
    setCookie(hostCookieName, host, cookieTimeLength);
    setCookie(usernameCookieName, username, cookieTimeLength);
  };

  React.useEffect(() => {
    const basicAuthCookie = getCookie(basicAuthCookieName);
    const hostCookie = getCookie(hostCookieName);
    const usernameCookie = getCookie(usernameCookieName);
    if (window.location.pathname !== "/login" && (!basicAuthCookie || !hostCookie || !usernameCookie)) {
      window.location.assign("/login");
    } else if (window.location.pathname === "/login" && basicAuthCookie && hostCookie && usernameCookie) {
      window.location.assign("/");
    }
    setBasicAuth({ basicAuth: basicAuthCookie, host: hostCookie, username: usernameCookie });
  }, []);   //eslint-disable-line

  return (
    <AuthContext.Provider value={{ basicAuth, setBasicAuth: setAuthAndCookie }}>
      {children}
    </AuthContext.Provider>
  );
}
