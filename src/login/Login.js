import React from "react";

import {
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  BackgroundImageSrc,
  ListItem,
  TextInput,
  Label,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import "./Login.css";

export default function Login() {
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

  const ServerNameForm = (
    <div>
      <Label>Server Name</Label>
      <TextInput
        value={state.serverName}
        type="text"
        onChange={handleServerNameChange}
        aria-label="text input example"
      />
    </div>
  );

  const loginForm = (
    <LoginForm
      // showHelperText={state.showHelperText}
      // helperText="help me"
      usernameLabel="Username"
      usernameValue={state.usernameValue}
      onChangeUsername={handleUsernameChange}
      isValidUsername={state.isValidUsername}
      passwordLabel="Password"
      passwordValue={state.passwordValue}
      onChangePassword={handlePasswordChange}
      isValidPassword={state.isValidPassword}
      rememberMeLabel="Keep me logged in for 30 days."
      isRememberMeChecked={state.isRememberMeChecked}
      onChangeRememberMe={onRememberMeClick}
      // onLoginButtonClick={this.onLoginButtonClick}
    />
  );

  return (
    <div>
      <LoginPage
        // footerListVariants="inline"
        // brandImgSrc={brandImg}
        // brandImgAlt="PatternFly logo"
        // backgroundImgSrc={images}
        backgroundImgAlt="Images"
        // footerListItems={listItem}
        textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
        loginTitle="Log in to your account"
        // loginSubtitle="Please use your single sign-on LDAP credentials"
        // socialMediaLoginContent={socialMediaLoginContent}
        // signUpForAccountMessage={signUpForAccountMessage}
        // forgotCredentials={forgotCredentials}
      >
        {ServerNameForm}
        {loginForm}
      </LoginPage>
    </div>
  );
}
