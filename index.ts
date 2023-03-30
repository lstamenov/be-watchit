require("express-async-errors");
import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_CONNECT_STRING } from './config';
import errorHandler from "./miiddlewares/errorHandler";
import userRoute from './controllers/user.controller';


const app: Application = express();
const start = async () => {
  try {
    await mongoose.connect(DB_CONNECT_STRING);

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(userRoute);
    app.use(errorHandler);

    app.listen(PORT, () => console.log('Server started on port: ' + PORT));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
