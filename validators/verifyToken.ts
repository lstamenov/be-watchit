import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if(!token) return res.status(401).send({ message: 'Access denied' });

  try {
    const userCredentials = jwt.verify(token, process.env.TOKEN_SECRET || 'mecmec');
    req.body.userCredentials = userCredentials;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

export default auth;