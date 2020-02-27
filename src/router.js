import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContentViews from "./ContentViews";
import LoginPage from "./login/LoginPage";

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ContentViews} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default router;
