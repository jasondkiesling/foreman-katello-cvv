import React from "react";
import {
  Card,
  CardHeader,
  Cardbody,
  CardFooter,
  Button
} from "@patternfly/react-core";
import { AuthContext } from "../utils/AuthProvider";

export default function CVVModals({ match }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvs, setCVVs] = React.useState([]);

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host) {
      return;
    }
    fetch(
      `https://${basicAuth.host}/katello/api/content_views/${match.params.id}/content_view_versions`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth.basicAuth}`
        }
      }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setCVVs(jsonResponse.results);
      });
  }, [basicAuth, match.params.id]);

  return (
    <div id="environments">
      {cvvs.map(cvv => (
        <div>
          <div id="content-view" key={cvv.id}>
            <strong>Version:&nbsp;</strong>
            {cvv.version}
            &nbsp;
            <strong>Name:&nbsp;</strong>
            {cvv.name}
          </div>
          <div id="drag-n-drop">
            <h3 id="NLE">No Lifecycle Environment</h3>
            <h3 id="Library">Library</h3>
            {cvv.environments.map(cvv_env => (
              <Card isHoverable value={cvv_env.name}>
                <CardHeader>{cvv_env.name}</CardHeader>
              </Card>
            ))}
            <h3 id="Testing">Testing</h3>
            <h3 id="Development">Development</h3>
            <h3 id="Production">Production</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
