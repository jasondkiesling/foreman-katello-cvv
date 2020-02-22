import React from "react";

import "./Header.css";

export default function Header() {
  return (
    <header className="page-header">
      <img
        src="/foreman_helmet.svg"
        alt="Helmet"
        className="header-logo helmet"
      />
      <img src="/foreman_text.png" alt="Foreman" className="header-logo text" />
    </header>
  );
}
