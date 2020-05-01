import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import {
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

  // const handleRemoveClick = () => {
  //   fetch(
  //     `https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Basic ${basicAuth.basicAuth}`,
  //       },
  //     },
  //   );
  // };

  return (
    <Modal
      className="cvv-modal"
      title={title}
      isOpen={open}
      onClose={onClose}
      envs={orgEnvironments}
    >
      {(cvvInfo.description) ? `${cvvInfo.description}` : `No description.`}
      <br /> <br />
      {/* {(cvvInfo.repositories.length === 0) ? null : `Repos:\t\t${cvvInfo.repositories.length}`} */}
      {(cvvInfo.package_group_count) ? <p>{`Package Groups:\t${cvvInfo.package_group_count}`}</p> : null}
      {(cvvInfo.package_count) ? <p>{`Packages:\t${cvvInfo.package_count}`}</p> : null}
      {(cvvInfo.file_count) ? <p>{`Files:\t\t${cvvInfo.file_count}`}</p> : null}
      {(cvvInfo.srpm_count) ? <p>{`RPMs:\t\t${cvvInfo.srpm_count}`}</p> : null}
      {(cvvInfo.module_stream_count) ? <p>{`Module Streams:\t${cvvInfo.module_stream_count}`}</p> : null}
      {(cvvInfo.puppet_module_count) ? <p>{`Puppet Modules:\t${cvvInfo.puppet_module_count}`}</p> : null}
      {(cvvInfo.docker_manifest_count) ? <p>{`Docker Manifests:\t${cvvInfo.docker_manifest_count}`}</p> : null}
      {(cvvInfo.docker_manifest_list_count) ? <p>{`Docker Manifest Lists:\t${cvvInfo.docker_manifest_list_count}`}</p> : null}
      {(cvvInfo.docker_tag_count) ? <p>{`Docker Tags:\t${cvvInfo.docker_tag_count}`}</p> : null}
      {(cvvInfo.ostree_branch_count) ? <p>{`OSTree Branches:\t${cvvInfo.ostree_branch_count}`}</p> : null}
      {(cvvInfo.deb_count) ? <p>{`Debian Repos:\t${cvvInfo.deb_count}`}</p> : null}
      <br />
      <PromotionDropdown cvvID={cvvID} envs={orgEnvironments} />
      {/* <Button className="remove-button" onClick={handleRemoveClick}>
        Remove
      </Button> */}
    </Modal>
  );
}
