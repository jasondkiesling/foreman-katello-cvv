import React from "react";

import { Dropdown, DropdownToggle, DropdownItem } from "@patternfly/react-core";
import { CaretDownIcon, UserIcon, KeyIcon } from "@patternfly/react-icons";
import "@patternfly/react-core/dist/styles/base.css";

import {
  AuthContext,
  basicAuthCookieName,
  hostCookieName,
  usernameCookieName,
} from "./utils/AuthProvider";
import { setCookie } from "./utils/CookieUtils";

import "./Header.css";

export default function Header() {
  const { basicAuth } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({ firstName: "", lastName: "" });
  const [menuOpen, setMenuOpen] = React.useState(true);

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host || !basicAuth.username) {
      return;
    }
    fetch(`https://${basicAuth.host}/api/users/${basicAuth.username}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth.basicAuth}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setUser({
          firstName: jsonResponse.firstname,
          lastName: jsonResponse.lastname,
        });
      });
  }, [basicAuth]);

  const handleLogout = () => {
    setCookie(basicAuthCookieName, "", -1);
    setCookie(usernameCookieName, "", -1);
    setCookie(hostCookieName, "", -1);
    window.location.assign("/login");
  };

  return (
    <header className="page-header">
      <img
        src="/foreman_helmet.svg"
        alt="Helmet"
        className="header-logo helmet"
      />
      <img src="/foreman_text.png" alt="Foreman" className="header-logo text" />
      <Dropdown
        id="header-menu"
        toggle={
          <DropdownToggle
            id="header-menu-toggle"
            onToggle={() => setMenuOpen(!menuOpen)}
            iconComponent={CaretDownIcon}
          >
            <UserIcon id="header-menu-user-icon" />
            {`${user.firstName} ${user.lastName}`}
          </DropdownToggle>
        }
        isOpen={menuOpen}
      >
        <DropdownItem
          key="logout"
          className="header-menu-item"
          onClick={handleLogout}
        >
          <KeyIcon id="logout-icon" />
          Logout
        </DropdownItem>
      </Dropdown>
    </header>
  );
}
