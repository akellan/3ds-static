/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type GamesList2QueryVariables = {};
export type GamesList2QueryResponse = {
    readonly files: ReadonlyArray<({
        readonly filename: string | null;
        readonly relativePath: string | null;
    }) | null> | null;
};
export type GamesList2Query = {
    readonly response: GamesList2QueryResponse;
    readonly variables: GamesList2QueryVariables;
};



/*
query GamesList2Query {
  files {
    filename
    relativePath
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "filename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "relativePath",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "GamesList2Query",
  "id": null,
  "text": "query GamesList2Query {\n  files {\n    filename\n    relativePath\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "GamesList2Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "files",
        "storageKey": null,
        "args": null,
        "concreteType": "File",
        "plural": true,
        "selections": [
          v0,
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GamesList2Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "files",
        "storageKey": null,
        "args": null,
        "concreteType": "File",
        "plural": true,
        "selections": [
          v0,
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '42d3b20599c1d3f9a9d079129dc3f720';
export default node;
