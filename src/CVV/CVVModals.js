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
    <div id="environments" className="pf-l-stack">
      <div id="NLE" className="pf-l-stack__item">
        <div className="env_titles">No Lifecycle Environment:</div>
      </div>
      <div id="NLE-cards" className="pf-l-stack__item">
        {cvvs
          ? Object.keys(cvvs).map((val) => {
              return (
                <div key={val} className="cards">
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
      <div id="Library" className="pf-l-stack__item">
        <div className="env_titles">Library:</div>
      </div>
      <div id="Lib-cards" className="pf-l-stack__item">
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
        <Card isHoverable>Test</Card>
      </div>
      <div id="Testing" className="pf-l-stack__item">
        <div className="env_titles">Testing:</div>
      </div>
      <div id="Test-cards" className="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
      <div id="Development" className="pf-l-stack__item">
        <div className="env_titles">Development:</div>
      </div>
      <div id="Dev-cards" className="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
      <div id="Production" className="pf-l-stack__item">
        <div className="env_titles">Production:</div>
      </div>
      <div id="Prod-cards" className="pf-l-stack__item">
        <Card isHoverable>Test</Card>
      </div>
    </div>
  );
}
