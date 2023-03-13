import { register, login } from "../controllers/auth.controller";
import { Request, Response, Router } from "express";
import apiHandler from "../utils/apiHandler";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  apiHandler({ handler: register, params: req.body, errorCode: 400, res });
});

router.post("/login", async (req: Request, res: Response) => {
  apiHandler({ handler: login, params: req.body, errorCode: 403, res });
});

export default router;
