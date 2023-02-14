import { Request, Response, Router } from "express";
import verifyToken from '../validators/verifyToken';
import { checkIfMovieIsAlreadyAdded, getUserFromRequest } from "../utils";

const router: Router = Router();

router.get('/user', verifyToken, async (req: Request, res: Response) => { 
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    res.send(user);
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

router.put('/avatar', verifyToken, async (req: Request, res: Response) => { 
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    user.avatarURL = req.body.avatar;
    await user.save();
    res.status(200).send({ message: 'Avatar changed successfully!' });
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

router.post('/movies', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    const movieId = req.body.id;
    checkIfMovieIsAlreadyAdded('movie', movieId, user);
    user.moviesList.push(movieId);
    user.save();
    res.status(200).send({ message: 'Movie added successfully!' });
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

router.post('/shows', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    const showId = req.body.id;
    checkIfMovieIsAlreadyAdded('show', showId, user);
    user.showsList.push(showId);
    user.save();
    res.status(200).send({ message: 'Show added successfully!' });
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

router.delete('/movies', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    user.moviesList = user.moviesList.filter((movieId) => movieId !== req.body.id);
    user.save();
    res.status(200).send({ message: 'Movie deleted successfully!' });
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

router.delete('/shows', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req.body.userCredentials._id);
    user.showsList = user.showsList.filter((showId) => showId !== req.body.id);
    user.save();
    res.status(200).send({ message: 'Show deleted successfully!' });
  } catch (e: any) {
    res.status(401).send({ message: e.message });
  }
});

export default router;