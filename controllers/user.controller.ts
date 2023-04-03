import { Request, Response, Router } from "express";
import UserService from "../services/UserService";
import verifyToken from "../miiddlewares/verifyToken";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";

type UserCredentials = { _id: string };

interface ModifyMoviesBody {
  userCredentials: UserCredentials;
  id: number;
}

const router: Router = Router();
const repository: UserRepository = new UserRepository(User);
const service: UserService = new UserService(repository);

router.get(
  "/user",
  verifyToken,
  async (
    req: Request<{}, {}, { userCredentials: UserCredentials }>,
    res: Response
  ) => {
    const {
      userCredentials: { _id },
    } = req.body;

    const result = await service.authUser(_id);
    res.send(result);
  }
);

router.put(
  "/avatar",
  verifyToken,
  async (
    req: Request<{}, {}, { userCredentials: UserCredentials; avatar: string }>,
    res: Response
  ) => {
    const { avatar, userCredentials } = req.body;
    const result = await service.changeAvatar(avatar, userCredentials._id);

    res.send(result);
  }
);

router.post(
  "/movies",
  verifyToken,
  async (req: Request<{}, {}, ModifyMoviesBody>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;

    const result = await service.addMovie(id, _id);
    res.send(result);
  }
);

router.post(
  "/shows",
  verifyToken,
  async (req: Request<{}, {}, ModifyMoviesBody>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;

    const result = await service.addShow(id, _id);
    res.send(result);
  }
);

router.delete(
  "/movies",
  verifyToken,
  async (req: Request<{}, {}, ModifyMoviesBody>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;

    const result = await service.removeMovie(id, _id);
    res.send(result);
  }
);

router.delete(
  "/shows",
  verifyToken,
  async (req: Request<{}, {}, ModifyMoviesBody>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;

    const result = await service.removeShow(id, _id);
    res.send(result);
  }
);

router.post(
  "/register",
  async (
    req: Request<{}, {}, { username: string; password: string; email: string }>,
    res: Response
  ) => {
    const { username, password, email } = req.body;
    const user = await service.register(username, password, email);

    res.send(user);
  }
);

router.post(
  "/login",
  async (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => {
    const { username, password } = req.body;
    const user = await service.login(username, password);

    res.send(user);
  }
);

export default router;
