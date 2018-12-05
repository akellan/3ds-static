import { Environment, Network, RecordSource, Store } from "relay-runtime";

const port = 3000;
const serverUri = `http://${document.location.hostname}:${port}`;

function fetchQuery(operation, variables) {
  return fetch(`${serverUri}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
