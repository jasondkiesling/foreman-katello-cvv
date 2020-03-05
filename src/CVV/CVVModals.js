import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
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
            <strong id="NLE">No Lifecycle Environment:</strong>
            <Card isHoverable>
              <CardHeader>Placeholder</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>End</CardFooter>
            </Card>
            <Card isHoverable>
              <CardHeader>Placeholder</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>End</CardFooter>
            </Card>
            <strong id="Library">Library:</strong>
            {cvv.environments.map(cvv_env => (
              <Card isHoverable>
                <CardHeader>{cvv_env.name}</CardHeader>
                <CardBody>{cvv_env.label}</CardBody>
                <CardFooter>End</CardFooter>
              </Card>
            ))}
            <strong id="Testing">Testing:</strong>
            <Card isHoverable>
              <CardHeader>Placeholder</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>End</CardFooter>
            </Card>
            <strong id="Development">Development:</strong>
            <Card isHoverable>
              <CardHeader>Placeholder</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>End</CardFooter>
            </Card>
            <strong id="Production">Production:</strong>
            <Card isHoverable>
              <CardHeader>Placeholder</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>End</CardFooter>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
