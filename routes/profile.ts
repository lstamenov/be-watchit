import { Request, Response, Router } from "express";
import verifyToken from "../validators/verifyToken";
import getUserFromRequest from "../utils/getUserFromRequest";
import checkIfMovieIsAlreadyAdded from "../utils/checkIfMovieIsAlreadyAdded";
import apiHandler from "../utils/apiHandler";
import {
  getUserData,
  changeUserAvatar,
  addMovieToList,
  addShowToList,
  removeMovieFromList,
  removeShowFromList,
} from "../controllers/profile.controller";

type UserCredentials = { _id: string };

interface ModifyMovies {
  userCredentials: UserCredentials;
  id: number;
}

const router: Router = Router();

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
    apiHandler({
      handler: getUserData,
      params: { id: _id },
      errorCode: 401,
      res,
    });
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
    apiHandler({
      handler: changeUserAvatar,
      params: { avatar, id: userCredentials._id },
      errorCode: 401,
      res,
    });
  }
);

router.post(
  "/movies",
  verifyToken,
  async (req: Request<{}, {}, ModifyMovies>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;
    apiHandler({
      handler: addMovieToList,
      params: { movieId: id, userId: _id },
      errorCode: 400,
      res,
    });
  }
);

router.post(
  "/shows",
  verifyToken,
  async (req: Request<{}, {}, ModifyMovies>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;
    apiHandler({
      handler: addShowToList,
      params: { showId: id, userId: _id },
      errorCode: 400,
      res,
    });
  }
);

router.delete(
  "/movies",
  verifyToken,
  async (req: Request<{}, {}, ModifyMovies>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;
    apiHandler({
      handler: removeMovieFromList,
      params: { movieId: id, userId: _id },
      errorCode: 400,
      res,
    });
  }
);

router.delete(
  "/shows",
  verifyToken,
  async (req: Request<{}, {}, ModifyMovies>, res: Response) => {
    const {
      id,
      userCredentials: { _id },
    } = req.body;
    apiHandler({
      handler: removeShowFromList,
      params: { showId: id, userId: _id },
      errorCode: 400,
      res,
    });
  }
);

export default router;
