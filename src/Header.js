import React from "react";

import { Dropdown, DropdownToggle, DropdownItem } from "@patternfly/react-core";
import { CaretDownIcon, UserIcon, KeyIcon } from "@patternfly/react-icons";
import "@patternfly/react-core/dist/styles/base.css";

import {
  AuthContext,
  basicAuthStorageKey,
  hostStorageKey,
  usernameStorageKey,
} from "./utils/AuthProvider";

import "./App.css";
import "./Header.css";

class FetchRejected extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Server rejected API call";
  }
}

export default function Header() {
  const { basicAuth } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({ firstName: "", lastName: "" });
  const [menuOpen, setMenuOpen] = React.useState(false);

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
      .then((response) => {
        if (!response.ok) {
          throw new FetchRejected();
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setUser({
          firstName: jsonResponse.firstname,
          lastName: jsonResponse.lastname,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err instanceof FetchRejected) {
          handleLogout(false);
          window.location.assign(
            `/login?redirect=${window.location.pathname}&error=401`,
          );
        }
      });
  }, [basicAuth]);

  const handleLogout = (redirect = true) => {
    localStorage.removeItem(basicAuthStorageKey);
    localStorage.removeItem(usernameStorageKey);
    localStorage.removeItem(hostStorageKey);
    if (redirect) {
      window.location.assign("/login");
    }
  };

  return (
    <header className="page-header">
      <a href="/">
        <img
          src="/foreman_helmet.svg"
          alt="Helmet"
          className="header-logo helmet"
        />
        <img
          src="/foreman_text.png"
          alt="Foreman"
          className="header-logo text"
        />
      </a>
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
