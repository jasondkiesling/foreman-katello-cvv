import React from "react";

import { WarningTriangleIcon } from "@patternfly/react-icons";

export default function LoginError({ message }) {
  return (
    <div className="error-invalid-login">
      <WarningTriangleIcon className="login-error-icon" />
      {message}
    </div>
  );
}
