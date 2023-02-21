import User from "../models/User";
import bcrypt from 'bcryptjs';
import { register, login } from "../controllers/auth.controller";
import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';

const router: Router = Router();

router.post("/register",  async (req: Request, res: Response) => {
  const result = await register(req.body);

  if (result) {
    res.send(result);
  }

  res.status(400).send({ errorCode: 400, message: "Username or Email already in use" });
});

router.post('/login', async (req: Request, res: Response) => {
  const result = await login(req.body);

    res.status(result?.jwt ? 200 : 400).send(result);
});

export default router;
