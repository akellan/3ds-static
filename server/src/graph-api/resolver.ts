import { readGames, Game } from "../games/readFromGamesFolder";

export const rootValue = {
  files: function(): ReadonlyArray<Game> {
    return readGames();
  }
};
