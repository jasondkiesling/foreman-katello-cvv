import React from "react";


import AuthProvider from "../utils/AuthProvider";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import "./Login.css";

export default function LoginPage() {
  return (
    <AuthProvider>
      <div id="login-page">
        <LoginHeader />
        <LoginForm />
      </div>
    </AuthProvider>
  );
}
