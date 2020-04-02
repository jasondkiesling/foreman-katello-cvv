import React from "react";

import { TextInput, Label, Checkbox, Button } from "@patternfly/react-core";
import qs from "querystring";

import LoginError from "./LoginError";
import { AuthContext } from "../utils/AuthProvider";

import "./Login.css";

class MissingLoginArguments extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Missing login arguments";
  }
}

class LoginRejected extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Server rejected authentication";
  }
}

export default function LoginForm() {
  const [state, setState] = React.useState({
    serverName: "",
    isRememberMeChecked: false,
    usernameValue: "",
    passwordValue: "",
    errorMessage: "",
  });

  const { setBasicAuth } = React.useContext(AuthContext);

  const onRememberMeClick = () => {
    setState({ ...state, isRememberMeChecked: !state.isRememberMeChecked });
  };

  const handleUsernameChange = (val) => {
    setState({ ...state, usernameValue: val });
  };

  const handlePasswordChange = (val) => {
    setState({ ...state, passwordValue: val });
  };

  const handleServerNameChange = (val) => {
    setState({ ...state, serverName: val });
  };

  const handleMessageClear = () => {
    setState({ ...state, errorMessage: "" });
  };

  const onSubmitClick = (e) => {
    try {
      if (!state.serverName || !state.usernameValue || !state.passwordValue) {
        throw new MissingLoginArguments();
      }
    } catch (err) {
      if (err instanceof MissingLoginArguments) {
        setState({
          ...state,
          errorMessage:
            "Server Address, Username, and Password are all required",
        });
        return;
      }
    }
    e.preventDefault();
    setState({ ...state, errorMessage: "" });
    fetch(`https://${state.serverName}/api/users/${state.usernameValue}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${window.btoa(
          `${state.usernameValue}:${state.passwordValue}`,
        )}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new LoginRejected();
        }
        setBasicAuth(
          window.btoa(`${state.usernameValue}:${state.passwordValue}`),
          state.serverName,
          state.usernameValue,
          state.isRememberMeChecked ? 30 : 0,
        );
        const queryStrings = qs.parse(window.location.search.slice(1));
        if (queryStrings.redirect) {
          window.location.assign(queryStrings.redirect);
        } else {
          window.location.assign("/");
        }
        return Promise.resolve();
      })
      .catch((err) => {
        if (err instanceof LoginRejected) {
          setState({ ...state, errorMessage: "Invalid Login Credentials" });
        } else {
          setState({ ...state, errorMessage: "Unable to Access Host" });
        }
        console.error(err);
      });
  };

  return (
    <form className="login-form">
      <h4 id="login-prompt">Log in to your account</h4>
      {state.errorMessage ? (
        <LoginError
          message={state.errorMessage}
          handleMessageClear={handleMessageClear}
        />
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
      <Button id="submit" onClick={onSubmitClick}>
        Submit!
      </Button>
    </form>
  );
}
