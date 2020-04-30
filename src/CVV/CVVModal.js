import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import {
  Button,
  Modal,
} from "@patternfly/react-core";
import PromotionDropdown from "./PromotionDropdown";

export default function CVVModal({ title, open, onClose, cvvID, orgID }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [cvvInfo, setCVVInfo] = React.useState([]);
  const [orgEnvironments, setOrgEnvironments] = React.useState([]);
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
      if (orgID) {
        fetch(
          `https://${basicAuth.host}/katello/api/organizations/${orgID}/environments`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${basicAuth.basicAuth}`,
            },
          },
        )
          .then((response) => response.json())
          .then((jsonResponse) => {
            setOrgEnvironments(jsonResponse.results);
          });
      }
    }
  }, [cvvID, basicAuth, open, orgID]);

  const handleRemoveClick = () => {
    fetch(
      `https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${basicAuth.basicAuth}`,
        },
      },
    );
  };

  return (
    <Modal
      className="cvv-modal"
      title={title}
      isOpen={open}
      onClose={onClose}
      envs={orgEnvironments}
    >
      {cvvInfo.description ? `${cvvInfo.description}` : `No description.`}
      <br /> <br />
      {`Packages:\t${cvvInfo.package_count}`}
      <br />
      {`Files:\t\t${cvvInfo.file_count}`}
      <br />
      {`RPMs:\t\t${cvvInfo.srpm_count}`}
      <br /> <br />
      <PromotionDropdown cvvID={cvvID} envs={orgEnvironments} />
      {/* <Button className="remove-button" onClick={handleRemoveClick}>
        Remove
      </Button> */}
    </Modal>
  );
}
