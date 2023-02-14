import User from "../models/User";
import bcrypt from 'bcryptjs';
import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';

const router: Router = Router();

router.post("/register",  async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      showsList: [],
      moviesList: [],
      avatarURL: "",
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
    res.status(200).send({ jwt: token, user });
  } else {
    res.status(400).send({ message: 'There is no such user' });
  }
});

export default router;
