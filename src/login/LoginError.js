import React from "react";

import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

export default function LoginError({ message, handleMessageClear }) {
  return (
    <Alert
      className="error-invalid-login"
      isInline
      isLiveRegion
      variant="danger"
      title={message}
      key={message}
      action={<AlertActionCloseButton onClose={handleMessageClear} />}
    />
  );
}
