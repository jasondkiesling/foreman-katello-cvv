import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContentViews from "./CVSelect/ContentViews";
import LoginPage from "./login/LoginPage";
import ContentViewVersions from "./CVV/ContentViewVersions";

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ContentViews} />
      <Route exact path="/content-view/:id" component={ContentViewVersions} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default router;
