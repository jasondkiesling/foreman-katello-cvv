import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import { Modal } from "@patternfly/react-core";

export default function CVVModal({ title, open, onClose, cvvID }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvInfo, setCVVInfo] = React.useState([]);

  if (!basicAuth.basicAuth || !basicAuth.host) { return; }

  fetch(`https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth.basicAuth}`,
    },
  })
    .then((response) => response.json())
    .then((arrayResponse) => {
      setCVVInfo(arrayResponse);
    });

  return (
    <Modal title={title} isOpen={open} onClose={onClose}>
      {`Version: ${cvvInfo.version}`}
      {`${cvvInfo.description}`}
    </Modal>
  );
}
