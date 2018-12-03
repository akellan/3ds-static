import cors from "cors";
import express from "express";

export function registerCors(app: express.Express) {
  app.use(cors());
}
