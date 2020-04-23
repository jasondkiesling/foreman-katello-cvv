import React from "react";

import "@patternfly/react-core/dist/styles/base.css";
import CVVButton from "./CVVButton";
import { AuthContext } from "../utils/AuthProvider";
import "./CVV.css";

export default function CVVDisplay({ match }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvs, setCVVs] = React.useState([]);
  const [cvvEnv, setCvvEnv] = React.useState([]);

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host) {
      return;
    }
    fetch(
      `https://${basicAuth.host}/katello/api/content_views/${match.params.id}/content_view_versions/`,
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
        setCvvEnv(jsonResults.environments);
      });
  }, [basicAuth, match.params.id]);

  return (
    <div id="environments" className="pf-l-stack">
      <div id="NLE" className="pf-l-stack__item">
        <div className="env-titles">No Lifecycle Environment</div>
        <div className="pf-l-stack__item cvv-button-row-wrap">
          {cvvs["none"]
            ? cvvs["none"].map((cvv) => {
                return <CVVButton key={cvv.id} cvv={cvv} />;
              })
            : null}
        </div>
      </div>
      {cvvEnv
        ? cvvEnv.map((env) => {
            return (
              <div className="pf-l-stack__item ">
                <div className="env-titles">{env.name}</div>
                <div className="cvv-button-row">
                  {cvvs[env.id]
                    ? cvvs[env.id].map((cvv) => {
                        return <CVVButton key={cvv.id} cvv={cvv} />;
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
