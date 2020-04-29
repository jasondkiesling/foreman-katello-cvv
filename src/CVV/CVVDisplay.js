import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import "@patternfly/react-core/dist/styles/base.css";
import CVVButton from "./CVVButton";
import "./CVV.css";

export default function CVVDisplay({ match }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvs, setCVVs] = React.useState([]);
  const [cvvEnvPaths, setCvvEnvPaths] = React.useState([]);

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host) {
      return;
    }
    fetch(
      `https://${basicAuth.host}/katello/api/content_views/${match.params.id}/content_view_versions?full_result=true`,
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
            if (currentVal.environments.length) {
              currentVal.environments.forEach((env) => {
                let envID = env.id;
                if (!cvvsByEnv[envID]) {
                  cvvsByEnv[envID] = [].concat(currentVal);
                } else {
                  cvvsByEnv[envID] = cvvsByEnv[envID].concat(currentVal);
                }
              });
            } else {
              let envID = "none";
              if (!cvvsByEnv[envID]) {
                cvvsByEnv[envID] = [].concat(currentVal);
              } else {
                cvvsByEnv[envID] = cvvsByEnv[envID].concat(currentVal);
              }
            }
            return cvvsByEnv;
          },
          {},
        );
        setCVVs(allCVVsByEnv);
      });

    fetch(
      `https://${basicAuth.host}/katello/api/content_views/${match.params.id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth.basicAuth}`,
        },
      },
    )
      .then((response) => response.json())
      .then((jsonResults) => {
        fetch(
          `https://${basicAuth.host}/katello/api/organizations/${jsonResults.organization_id}/environments/paths`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${basicAuth.basicAuth}`,
            },
          },
        )
          .then((response) => response.json())
          .then((jsonResults) => {
            setCvvEnvPaths(jsonResults.results);
          });
      });
  }, [basicAuth, match.params.id]);

  return (
    <div id="cvv-info">
      <div id="NLE">
        <div className="path-title">No Lifecycle Environment</div>
        <div className=" cvv-button-row-wrap">
          {cvvs["none"]
            ? cvvs["none"].map((cvv) => {
                return <CVVButton key={cvv.id} cvv={cvv} />;
              })
            : null}
        </div>
      </div>
      {cvvEnvPaths
        ? cvvEnvPaths.map((path, i) => {
            return (
              <div className="lifecycle-path" key={`path-${i + 1}`}>
                <div className="path-title">{`Lifecycle Path #${i + 1}`}</div>
                <div className="path-env-list">
                  {path.environments.length
                    ? path.environments.map((env) => {
                        return (
                          <div className="path-env" key={env.id}>
                            <div className="env-title">{env.name}</div>
                            {cvvs[env.id]
                              ? cvvs[env.id].map((cvv) => {
                                  return <CVVButton key={cvv.id} cvv={cvv} />;
                                })
                              : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
