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
      <div id="NLE-cards" class="pf-l-stack__item">
        {cvvs
          ? Object.keys(cvvs).map((val) => {
              return (
                <div key={val} class="cards">
                  <Card isHoverable>
                    Environment ID: {val}
                    {cvvs[val].map((cvv) => {
                      return (
                        <div key={cvv.id}>
                          <CardHeader>
                            <strong>Version:&nbsp;</strong>
                            {cvv.version}
                            &nbsp;
                          </CardHeader>
                          <CardBody>
                            <strong>Name:&nbsp;</strong>
                            {cvv.name}
                          </CardBody>
                        </div>
                      );
                    })}{" "}
                  </Card>
                </div>
              );
            })
          : null}
      </div>
      <div id="Library" class="pf-l-stack__item">
        <div class="env_titles">Library:</div>
      </div>
      <div id="Lib-cards" class="pf-l-stack__item">
        <Card isHoverable>Test 1</Card>
        <Card isHoverable>Test 2</Card>
        <Card isHoverable>Test 3</Card>
        <Card isHoverable>Test 4</Card>
        <Card isHoverable>Test 5</Card>
        <Card isHoverable>Test 6</Card>
        <Card isHoverable>Test 7</Card>
        <Card isHoverable>Test 8</Card>
        <Card isHoverable>Test 9</Card>
        <Card isHoverable>Test 10</Card>
      </div>
      <div id="Testing" class="pf-l-stack__item">
        <div class="env_titles">Testing:</div>
      </div>
      <div id="Test-cards" class="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
      <div id="Development" class="pf-l-stack__item">
        <div class="env_titles">Development:</div>
      </div>
      <div id="Dev-cards" class="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
      <div id="Production" class="pf-l-stack__item">
        <div class="env_titles">Production:</div>
      </div>
      <div id="Prod-cards" class="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
    </div>
  );
}
