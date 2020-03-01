import React from "react";
import Header from "./Header";
// import logo from "./logo.svg";
import "./App.css";
import AuthProvider from "./utils/AuthProvider";

export default function ContentViews() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
      </div>
    </AuthProvider>
  );
}
