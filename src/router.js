import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import LoginPage from "./login/LoginPage";

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default router;
