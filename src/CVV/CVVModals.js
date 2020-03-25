import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import { AuthContext } from "../utils/AuthProvider";
import "./CVV.css";

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
          Authorization: `Basic ${basicAuth.basicAuth}`,
        },
      },
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        setCVVs(jsonResponse.results);
      });
  }, [basicAuth, match.params.id]);

  return (
    <div id="environments">
      {cvvs
        ? cvvs.map((cvv) => (
            <div key={cvv.id}>
              {cvv.environments.map((cvv_env) => (
                <Card isHoverable>
                  <CardHeader>
                    <strong>Version:&nbsp;</strong>
                    {cvv.version}
                  </CardHeader>
                  <CardBody>
                    <strong>Environment:&nbsp;</strong>
                    {`${cvv_env.name}`}
                  </CardBody>
                  <CardBody>
                    <strong>Description:&nbsp;</strong>
                    {cvv.description}
                  </CardBody>
                </Card>
              ))}
            </div>
          ))
        : null}
      <h3 id="NLE">No Lifecycle Environment</h3>
      <h3 id="Library">Library</h3>
      <h3 id="Testing">Testing</h3>
      <h3 id="Development">Development</h3>
      <h3 id="Production">Production</h3>
    </div>
  );
}
