import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import cors from "cors";

import { router } from "./routes";

import "./database";

// @types/express
const app = express();

// General Middlewares
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      "error": err.message,
    });
  };

  return response.status(500).json({
    "status": "error",
    "error": "Internal Server Error",
  });
})

const PORT = 3000
// http://localhhost:3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));