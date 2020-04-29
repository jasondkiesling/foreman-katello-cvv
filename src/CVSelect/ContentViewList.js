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
    fetch(
      `https://${basicAuth.host}/katello/api/content_views?full_result=true${
        debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth.basicAuth}`,
        },
      },
    )
      .then((response) => response.json())
      .then((arrayResponse) => {
        setContentViews(arrayResponse.results);
      });
  }, [basicAuth, debouncedSearchTerm]);

  const handleOnClick = (id) => {
    window.location.assign(`/content-view/${id}`);
  };

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
          <Button className="card-button" onClick={() => handleOnClick(cv.id)}>
            <Card isCompact isHoverable id={cv.name.toLowerCase()}>
              <CardHeader className="card-header">
                <strong>{cv.name}</strong>
                <div className="cv-description">{cv.description}</div>
              </CardHeader>
              <CardBody>
                <div className="card-body">
                  <div className="column">
                    <p>
                      <strong>Organization: </strong>
                      <br></br>
                      {`${cv.organization.name}`}
                    </p>
                  </div>
                  &nbsp;
                  <div className="column">
                    <p>
                      <strong>Version Count: </strong>
                      <br></br>
                      {`${cv.version_count}`}
                    </p>
                  </div>
                  &nbsp;
                  <div className="column">
                    <p>
                      <strong>Current Version: </strong>
                      <br></br>
                      {` ${cv.latest_version}`}
                    </p>
                  </div>
                  &nbsp;
                  <div className="column">
                    <p>
                      <strong>Repositories: </strong>
                      <br></br>
                      <p>{cv.repositories.length}</p>
                    </p>
                  </div>
                  &nbsp;
                  <div className="column">
                    <p>
                      <strong>Composite View: </strong>
                      <br></br>
                      {`${cv.composite}`}
                    </p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="card-footer">
                <strong>Last Updated on: </strong>
                {`${cv.updated_at}`}
              </CardFooter>
            </Card>
          </Button>
        </div>
      ))}
    </div>
  );
}
