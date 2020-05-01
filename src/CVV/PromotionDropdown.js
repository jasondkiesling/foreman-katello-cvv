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
    if (window.confirm(`This will promote this CVV. Are you sure?`)) {
      fetch(
        `https://${basicAuth.host}/katello/api/content_view_versions/${cvvID}/promote?environment_id=${v}&force=true`,
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            Authorization: `Basic ${basicAuth.basicAuth}`,
            "Content-Type": "application/json",
          },
        },
      ).then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          window.alert("Promotion failed.");
        }
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Select
      className="env-select"
      onToggle={handleToggle}
      isExpanded={isOpen}
      onSelect={handleSelect}
      placeholderText="Promote to..."
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
