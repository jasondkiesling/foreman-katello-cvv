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
        const allCVVsByEnv = jsonResponse.results.reduce(
          (cvvsByEnv, currentVal) => {
            let envID = currentVal.environments[0]
              ? currentVal.environments[0].id
              : "none";
            if (!cvvsByEnv[envID]) {
              cvvsByEnv[envID] = [].concat(currentVal);
            } else {
              cvvsByEnv[envID] = cvvsByEnv[envID].concat(currentVal);
            }
            return cvvsByEnv;
          },
          {},
        );
        setCVVs(allCVVsByEnv);
      });
  }, [basicAuth, match.params.id]);

  return (
    <div id="environments" class="pf-l-stack">
      <div id="NLE" class="pf-l-stack__item">
        <div class="env_titles">No Lifecycle Environment:</div>
      </div>
      <div class="pf-l-stack__item">
        {cvvs
          ? cvvs.map((cvv) => (
              <div key={cvv.id} id="cards">
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
      </div>
      <div id="Library" class="pf-l-stack__item">
        <div class="env_titles">Library:</div>
      </div>
      <div id="Testing" class="pf-l-stack__item">
        <div class="env_titles">Testing:</div>
      </div>
      <div id="Development" class="pf-l-stack__item">
        <div class="env_titles">Development:</div>
      </div>
      <div id="Production" class="pf-l-stack__item">
        <div class="env_titles">Production:</div>
      </div>
    </div>
  );
}
