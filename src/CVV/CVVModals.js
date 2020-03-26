import React from "react";
// import { Label, Button } from "@patternfly/react-core";
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
    <div id="environments">
      {cvvs
        ? Object.keys(cvvs).map((val) => {
            return (
              <div key={val}>
                Environment ID: {val}
                {cvvs[val].map((cvv) => {
                  return (
                    <div key={cvv.id}>
                      <strong>Version:&nbsp;</strong>
                      {cvv.version}
                      &nbsp;
                      <strong>Name:&nbsp;</strong>
                      {cvv.name}
                    </div>
                  );
                })}{" "}
              </div>
            );
          })
        : null}
    </div>
  );
}
