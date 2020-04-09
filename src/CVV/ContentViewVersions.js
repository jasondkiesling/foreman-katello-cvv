import React from "react";
import Header from "../Header";
// import logo from "./logo.svg";
import "./CVV.css";
import AuthProvider from "../utils/AuthProvider";
import CVVDisplay from "./CVVDisplay";

export default function ContentViewVersions({ match }) {
  return (
    <AuthProvider>
      <div id="Modals">
        <Header />
        <CVVDisplay match={match} />
      </div>
    </AuthProvider>
  );
}
