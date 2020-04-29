import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import { Modal } from "@patternfly/react-core";

export default function CVVModal({ title, open, onClose, cvvID }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvInfo, setCVVInfo] = React.useState([]);
  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host) {
      return;
    }
    if (open) {
      fetch(
        `https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${basicAuth.basicAuth}`,
          },
        },
      )
        .then((response) => response.json())
        .then((jsonResponse) => {
          setCVVInfo(jsonResponse);
        });
    }
  }, [cvvID, basicAuth, open]);

  return (
    <Modal className="cvv-modal" title={title} isOpen={open} onClose={onClose}>
      {cvvInfo.description ? `${cvvInfo.description}` : `No description.`}
      <br /> <br />
      {`Packages:\t${cvvInfo.package_count}`}
      <br />
      {`Files:\t\t${cvvInfo.file_count}`}
      <br />
      {`RPMs:\t\t${cvvInfo.srpm_count}`}
      <br />
    </Modal>
  );
}
