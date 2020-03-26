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
    window.location.assign(`/content-view/${id}`);
  };

  const handleOnSearchChange = (val) => {
    if (val === "") {
      contentViews.forEach((cv) => {
        document.getElementById(cv.name.toLowerCase()).style.display = "block";
      });
      return;
    }

    contentViews.forEach((cv) => {
      if(!cv.name.toLowerCase().includes(val)) { document.getElementById(cv.name.toLowerCase()).style.display = "none"; }
      else { document.getElementById(cv.name.toLowerCase()).style.display = "block"; }
    });
  };

  return (
    <div className="cv-select">
      <TextInput
        id="cv-search"
        className="searchbar"
        type="text"
        placeholder="Search Content Views..."
        onChange={handleOnSearchChange}
      />
      <Card id="card-container">
        {contentViews.map((cv) => (
          <div key={cv.id}>
            <Button id="card-button" onClick={() => handleOnClick(cv.id)}>
              <Card isCompact isHoverable id={cv.name.toLowerCase()}>
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
      </Card>
    </div>
  );
}
