import React from "react";

import Header from "../Header";
import ContentViewList from "./ContentViewList";
// import logo from "./logo.svg";
import "./ContentViews.css";
import AuthProvider from "../utils/AuthProvider";

export default function ContentViews() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <ContentViewList />
      </div>
    </AuthProvider>
  );
}
