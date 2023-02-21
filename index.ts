import express, { Application } from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import profileRoute from "./routes/profile";
import dotenv from "dotenv";
import { connectDB } from './config';

const app: Application = express();
dotenv.config();

const start = async () => {
  try {
    await connectDB();

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(authRoute);
    app.use(profileRoute);

    app.listen(process.env.PORT || 3001, () => console.log("Server started"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
