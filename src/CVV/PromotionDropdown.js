import React from "react";
import { AuthContext } from "../utils/AuthProvider";

import { Select, SelectOption } from "@patternfly/react-core";

export default function PromotionDropdown({ cvvID, envs }) {
  const { basicAuth } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e, v) => {
    console.log(v);
    fetch(
      `https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}/promote?environment_id=${v}`,
      {
        method: "POST",
        body: {},
        headers: {
          Authorization: `Basic ${basicAuth.basicAuth}`,
          "Content-Type": "application/json"
        },
      },
    );
  };

  return (
    <Select
      className="env-select"
      onToggle={handleToggle}
      isExpanded={isOpen}
      onSelect={handleSelect}
    >
      {envs.map((env) => {
        return (
          <SelectOption key={env.id} value={`${env.id}`}>
            {env.name}
          </SelectOption>
        );
      })}
    </Select>
  );
}
