import React from "react";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import "./Login.css";

export default function LoginPage() {
  return (
    <div id="login-page">
      <LoginHeader />
      <LoginForm />
    </div>
  );
}
