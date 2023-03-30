import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: "Internal service error" });
  }
};

export default errorHandler;
