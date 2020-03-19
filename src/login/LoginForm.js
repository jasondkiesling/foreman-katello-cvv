import React from "react";

import { TextInput, Label, Checkbox, Button } from "@patternfly/react-core";
import qs from "querystring";

import { AuthContext } from "../utils/AuthProvider";

import "./Login.css";

export default function LoginForm() {
  const [state, setState] = React.useState({
    serverName: "",
    isRememberMeChecked: false,
    usernameValue: "",
    isValidUsername: false,
    passwordValue: "",
    isValidPassword: false,
    showHelperText: false,
    loginRejected: false
  });

  const { setBasicAuth } = React.useContext(AuthContext);

  const onRememberMeClick = () => {
    setState({ ...state, isRememberMeChecked: !state.isRememberMeChecked });
  };

  const handleUsernameChange = val => {
    setState({ ...state, usernameValue: val });
  };

  const handlePasswordChange = val => {
    setState({ ...state, passwordValue: val });
  };

  const handleServerNameChange = val => {
    setState({ ...state, serverName: val });
  };

  const onSubmitClick = e => {
    e.preventDefault();
    setState({ ...state, loginRejected: false });
    fetch(`https://${state.serverName}/api/users/${state.usernameValue}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${window.btoa(
          `${state.usernameValue}:${state.passwordValue}`
        )}`
      }
    })
      .then(response => {
        if (!response.ok) {
          setState({ ...state, loginRejected: true });
          return Promise.reject("Server rejected authentication"); //eslint-disable-line
        }
        setBasicAuth(
          window.btoa(`${state.usernameValue}:${state.passwordValue}`),
          state.serverName,
          state.usernameValue,
          state.isRememberMeChecked ? 30 : 0
        );
        const queryStrings = qs.parse(window.location.search.slice(1));
        if (queryStrings.redirect) {
          window.location.assign(queryStrings.redirect);
        } else {
          window.location.assign("/");
        }
        return Promise.resolve();
      })
      .catch(err => {
        setState({ ...state, loginRejected: true });
        console.error(err);
      });
  };

  return (
    <form className="login-form">
      <h4>Log in to your account</h4>
      {state.loginRejected ? (
        <Label id="error-invalid-login">Error: Invalid Login Credentials</Label>
      ) : null}
      <Label>Server Address:</Label>
      <TextInput
        id="server_address"
        type="text"
        value={state.serverName}
        onChange={handleServerNameChange}
      />
      <Label>Username:</Label>
      <TextInput
        id="username"
        type="text"
        value={state.usernameValue}
        onChange={handleUsernameChange}
      />
      <Label>Password:</Label>
      <TextInput
        id="password"
        type="password"
        value={state.passwordValue}
        onChange={handlePasswordChange}
      />
      <div className="remember_box">
        <Label>Remember Me?</Label>
        <Checkbox
          id="remember_me"
          value={state.isRememberMeChecked}
          onClick={onRememberMeClick}
        />
      </div>
      <Button
        id="submit"
        // type="submit"
        onClick={onSubmitClick}
      >
        Submit!
      </Button>
    </form>
  );
}
