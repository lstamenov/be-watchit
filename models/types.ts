import { HydratedDocument } from "mongoose";
import { UserI } from "../types";
import User from "./User"

export type UserModel = typeof User;

export type UserDTO = HydratedDocument<UserI>;