import React, { isValidElement } from "react";

import {
  LoginPage,
  TextInput,
  Label,
  Checkbox,
  Button
} from "@patternfly/react-core";

export default function SimpleForm() {
  const [state, setState] = React.useState({
    serverName: "",
    isRememberMeChecked: false,
    usernameValue: "",
    isValidUsername: false,
    passwordValue: "",
    isValidPassword: false,
    showHelperText: false
  });

  const [basicAuth, setBasicAuth] = React.useState("");

  React.useEffect(() => {
    setBasicAuth(window.btoa(`${state.usernameValue}:${state.passwordValue}`));
  }, [state.usernameValue, state.passwordValue]);

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
    console.log(basicAuth);
    console.log(state);
    fetch(`https://${state.serverName}/katello/api/content_views`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
      })
      .catch(e => console.error(e));
  };

  return (
    <form>
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
      <Label>Remember Me?</Label>
      <Checkbox
        id="remember_me"
        value={state.isRememberMeChecked}
        onClick={onRememberMeClick}
      />
      <Button
        id="submit"
        // type="submit"
        variant="danger"
        onClick={onSubmitClick}
      >
        Submit!
      </Button>
    </form>
  );
}
