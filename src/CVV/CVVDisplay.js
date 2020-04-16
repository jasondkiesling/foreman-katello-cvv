import React from "react";

import "@patternfly/react-core/dist/styles/base.css";
import CVVButton from "./CVVButton"
import { AuthContext } from "../utils/AuthProvider";
import "./CVV.css";

export default function CVVDisplay({ match }) {
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
                  {cvvs[val].map((cvv) => {
                    return (
                      <CVVButton key={cvv.id} cvv={cvv} />
                    );
                  })}
                </div>
              );
            })
          : null }
      </div>
    </div>
  );
}
