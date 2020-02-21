import React from "react";

export default function MyComponent({ name, occupation = "unemployed", gender }) {
  const [basicAuth, setBasicAuth] = React.useState("");

  React.useEffect(() => {
    const username = "admin";
    const password = "windyring86";
    setBasicAuth(window.btoa(`${username}:${password}`));
  }, []);

  React.useEffect(() => {
    if (basicAuth) {
      fetch("https://cs-cos7-foreman/katello/api/content_views", {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => { console.log(jsonResponse); }).catch((e) => console.error(e));
    }
  }, [basicAuth]);

  return (
    <div>
      <h1>Hello, this is a component!</h1>
      <p>I do things.</p>
      <p>{`${name} is a ${occupation} who is ${gender}`}</p>
    </div>
  );
}
