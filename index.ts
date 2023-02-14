import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth';
import profileRoute from './routes/profile';
import dotenv from 'dotenv';

const app: Application = express();
app.use(cors({ origin: '*' }));

dotenv.config();

mongoose.connect(process.env.DB_CONNECT || '3000', () => console.log('connected'));

app.use(express.json());
app.use(authRoute);
app.use(profileRoute);

app.listen(process.env.PORT || 3001, () => console.log('running'));