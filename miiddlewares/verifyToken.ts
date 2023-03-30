import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import AppError from "../errors/AppError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  if (!token) throw new AppError('Invalid access token', 403);

  try {
    const userCredentials = jwt.verify(token, TOKEN_SECRET);
    req.body.userCredentials = userCredentials;
    next();
  } catch (err) {
    throw new AppError('Invalid access token', 403);
  }
};

export default auth;
