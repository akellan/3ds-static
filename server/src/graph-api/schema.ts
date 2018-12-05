import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    files: [File]
  }
  
  type File {
    id: ID,
    filename: String,
    relativePath: String,
  }
`);
