import React from "react";

import Header from "../Header";
import Login from "./Login";
import MyComponent from "./Component";

import "./Login.css";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <MyComponent name="Evan" gender="male" />
      <Login />
    </div>
  );
}
