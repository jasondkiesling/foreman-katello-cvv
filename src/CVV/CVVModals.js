import React from "react";
import { Label, Button } from "@patternfly/react-core";
import AuthProvider from "../utils/AuthProvider";

export default function CVVModals() {
  /*fetch(
    `https://${state.usernameValue}:${state.passwordValue}@${state.serverName}/katello/api/content_view_versions`,
    {
      method: "GET",
      headers: {}
    }
  );*/
  return (
    <div id="environments">
      <h3 id="NLE">No Lifecycle Environment</h3>
      <h3 id="Library">Library</h3>
      <h3 id="Testing">Testing</h3>
      <h3 id="Development">Development</h3>
      <h3 id="Production">Production</h3>
    </div>
  );
}
