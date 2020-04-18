import React from "react";

import { TextInput, Label, Button } from "@patternfly/react-core";
import qs from "querystring";

import LoginError from "./LoginError";
import { AuthContext } from "../utils/AuthProvider";
import useKeyPress from "../utils/useKeyPress";

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

class InvalidForemanServer extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Server does not appear to be a Foreman server";
  }
}

export default function LoginForm() {
  const [state, setState] = React.useState({
    serverName: "",
    usernameValue: "",
    passwordValue: "",
    errorMessage: "",
    isLoading: false,
  });
  const enterPressed = useKeyPress("Enter");

  React.useEffect(() => {
    const queryStrings = qs.parse(window.location.search.slice(1));
    if (queryStrings.error === "401") {
      setState({
        ...state,
        errorMessage: "Your server rejected our request. Please login again.",
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (enterPressed) {
      onSubmitClick();
    }
  }, [enterPressed, onSubmitClick]);

  const { setBasicAuth } = React.useContext(AuthContext);

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
    if (e) {
      e.preventDefault();
    }
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
        return response.json();
      })
      .then((response) => {
        if (response.login !== state.usernameValue) {
          throw new InvalidForemanServer();
        }
        setBasicAuth(
          window.btoa(`${state.usernameValue}:${state.passwordValue}`),
          state.serverName,
          state.usernameValue,
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
        } else if (
          err instanceof InvalidForemanServer ||
          err instanceof SyntaxError
        ) {
          setState({
            ...state,
            errorMessage: "Server does not appear to be a Foreman server",
          });
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
      <Button id="submit" onClick={onSubmitClick}>
        Submit!
      </Button>
    </form>
  );
}
