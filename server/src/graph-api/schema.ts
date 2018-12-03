import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    files: [File]
  }
  
  type File {
    filename: String,
    relativePath: String,
  }
`);
