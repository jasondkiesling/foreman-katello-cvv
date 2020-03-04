import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "@patternfly/react-core";

import { AuthContext } from "../utils/AuthProvider";

export default function ContentViewList() {
  const [contentViews, setContentViews] = React.useState([]);

  const { basicAuth } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!basicAuth.basicAuth || !basicAuth.host) {
      return;
    }
    fetch(`https://${basicAuth.host}/katello/api/content_views/`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth.basicAuth}`,
      },
    })
      .then((response) => response.json())
      .then((arrayResponse) => {
        setContentViews(arrayResponse.results);
      });
  }, [basicAuth]);

  return contentViews.map((cv) => (
    <div key={cv.id}>
      <Button>
        <Card>
          <CardHeader>{cv.name}</CardHeader>
          <CardBody>
            <strong>Description:</strong>
            {cv.description}
          </CardBody>
          <CardFooter>
            <strong>Version:</strong>
            {cv.latest_version}
          </CardFooter>
        </Card>
      </Button>
    </div>
  ));
}
