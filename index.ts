import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth";
import profileRoute from "./routes/profile";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT || "");

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(authRoute);
    app.use(profileRoute);

    app.listen(3001, () => console.log("Server started"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
