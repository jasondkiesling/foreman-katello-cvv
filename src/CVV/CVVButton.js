import React from "react";

import CVVModal from "./CVVModal";
import { Button, Card, CardHeader, CardFooter } from "@patternfly/react-core";

export default function CVVButton({ cvv }) { 
  const [open, setOpen] = React.useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleOnClick}>
        <Card isHoverable>
          <CardHeader>
            <strong>Name:&nbsp;</strong>
            {cvv.name}
          </CardHeader>
          <CardFooter>
            <strong>Version:&nbsp;</strong>
            {cvv.version}
          </CardFooter>
        </Card>
      </Button>
      <CVVModal
        title={cvv.name}
        id={`modal-${cvv.id}`}
        cvvID={cvv.id}
        open={open}
        onClose={handleOnClick}
      />
    </div>
  );
}
