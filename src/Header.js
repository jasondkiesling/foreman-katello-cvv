import React from "react";

import { AuthContext } from "./utils/AuthProvider";

import "./Header.css";

export default function Header() {
  const { basicAuth } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({ firstName: "", lastName: "" });

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host || !basicAuth.username) {
      return;
    }
    fetch(`https://${basicAuth.host}/api/users/${basicAuth.username}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth.basicAuth}`,
      },
    }).then((response) => response.json()).then((jsonResponse) => {
      setUser({ firstName: jsonResponse.firstname, lastName: jsonResponse.lastname });
    });
  }, [basicAuth]);

  return (
    <header className="page-header">
      <img
        src="/foreman_helmet.svg"
        alt="Helmet"
        className="header-logo helmet"
      />
      <img src="/foreman_text.png" alt="Foreman" className="header-logo text" />
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </header>
  );
}
