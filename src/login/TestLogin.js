import React from "react";

import {
  LoginPage,
  TextInput,
  Label,
} from "@patternfly/react-core";

export default function SimpleForm() {
  const [state, setState] = React.useState({
    serverName: "",
    isRememberMeChecked: false,
    usernameValue: "",
    isValidUsername: false,
    passwordValue: "",
    isValidPassword: false,
    showHelperText: false,
  });

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
}
