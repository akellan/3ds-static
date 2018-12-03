import fs from "fs";
import { configuration } from "../configuration";

export interface Game {
  relativePath: string;
  filename: string;
}

function createGame(filename: string): Game {
  return {
    filename,
    relativePath: configuration.gamesRemotePath
  };
}

export function readGames(): ReadonlyArray<Game> {
  const files = fs.readdirSync(configuration.gamesFolder);

  if (files && files.length > 0) {
    return files.map(createGame);
  }

  return [];
}
