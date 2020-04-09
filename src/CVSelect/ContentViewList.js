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

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState("");
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setDebouncedValue]);

  return debouncedValue;
}

export default function ContentViewList() {
  const [contentViews, setContentViews] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  React.useEffect(() => {
    if (!debouncedSearchTerm) {
      contentViews.forEach((cv) => {
        document.getElementById(cv.name.toLowerCase()).style.display = "block";
      });
      return;
    }

    contentViews.forEach((cv) => {
      const str = cv.name.toLowerCase();
      if (!str.includes(debouncedSearchTerm)) {
        document.getElementById(str).style.display = "none";
      } else {
        document.getElementById(str).style.display = "block";
      }
    });
  }, [contentViews, debouncedSearchTerm]);

  const handleOnSearchChange = (val) => {
    setSearchTerm(val);
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

      {contentViews.map((cv) => (
        <div key={cv.id}>
          <Button id="card-button" onClick={() => handleOnClick(cv.id)}>
            <Card isCompact isHoverable id={cv.name.toLowerCase()}>
              <CardHeader className="card">
                <strong>{cv.name}</strong>
              </CardHeader>
              <CardBody className="card">
                <strong>Description: </strong>
                {` ${cv.description}`}
              </CardBody>
              <CardBody className="card">
                <strong>Version Count: </strong>
                {`${cv.version_count}`}
              </CardBody>
              <CardBody className="card">
                <strong>Current Version: </strong>
                {` ${cv.latest_version}`}
              </CardBody>
              <CardBody className="card">
                <strong>Environments:</strong>
                {`${cv.environments}`}
              </CardBody>
              <CardBody className="card-footer">
                <strong>Last Updated on: </strong>
                {`${cv.updated_at}`}
                {/*This prints out in UTC time, maybe dont include this or find a way to convert to local time and make pretty*/}
              </CardBody>
            </Card>
          </Button>
        </div>
      ))}
    </div>
  );
}
