import React from "react";
import Header from "../Header";
// import logo from "./logo.svg";
// import "./App.css";
import AuthProvider from "../utils/AuthProvider";

export default function ContentViewVersions() {
  return (
    <AuthProvider>
      <div className="Modals">
        <Header />
      </div>
    </AuthProvider>
  );
}
