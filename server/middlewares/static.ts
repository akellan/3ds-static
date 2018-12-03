import { static as st, Express } from "express";

export function registerStaticFolder(app: Express, folder: string) {
  app.use("/static", st(folder));
}
