import React from "react";
import Header from "../Header";
// import logo from "./logo.svg";
import "./CVV.css";
import AuthProvider from "../utils/AuthProvider";
import CVVModals from "./CVVModals";

export default function ContentViewVersions() {
  return (
    <AuthProvider>
      <div id="Modals">
        <Header />
        <CVVModals />
      </div>
    </AuthProvider>
  );
}
