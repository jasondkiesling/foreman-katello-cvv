import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  TextInput,
} from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";

import { AuthContext } from "../utils/AuthProvider";

import "./ContentViews.css";

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

  const handleOnClick = (id) => {
    window.location.assign(`https://localhost:3000/content-view/${id}`);
  };

  return (
    <div className="cv-select">
      <TextInput id="cv-search" className="searchbar" type="text" placeholder="Search Content Views..." />
      {contentViews.map((cv) => (
        <div key={cv.id}>
          <Button id="card-button">
            <Card isCompact value={cv.id} onClick={handleOnClick}>
              <CardHeader>{cv.name}</CardHeader>
              <CardBody>
                <strong>Description:</strong>
                {` ${cv.description}`}
              </CardBody>
              <CardFooter>
                <strong>Version:</strong>
                {` ${cv.latest_version}`}
              </CardFooter>
            </Card>
          </Button>
        </div>
      ))}
    </div>
  );
}
