import React from "react";

import "./Login.css";

export default function LoginHeader() {
  return (
    <header id="login-header">
      <img
        src="/foreman_helmet.svg"
        alt="Helmet"
        className="header-logo helmet"
      />
      <img src="/foreman_text.png" alt="Foreman" className="header-logo text" />
      <h3>Foreman/Katello Content View Browser</h3>
    </header>
  );
}
