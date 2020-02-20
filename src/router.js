import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      {/* <Route path="/enhancement/:year/:enhancement" component={Enhancement} />
        <Route path="/error-404" component={error} />
        <Route path="/**" component={error} /> */}
    </Switch>
  </BrowserRouter>
);

export default router;
