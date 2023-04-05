import { UserDTO } from "../models/types";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import AppError from "../errors/AppError";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  private async getUserById(id: string): Promise<UserDTO> {
    return this.userRepository.findById(id);
  }

  async authUser(id: string): Promise<{ user: UserDTO; jwt: string }> {
    const user = await this.getUserById(id);
    const token = jwt.sign(
      { _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 },
      TOKEN_SECRET
    );
    return { jwt: token, user };
  }

  private movieAlreadyAdded(movieId: number, user: UserDTO): void {
    const isMovieAlreadyAdded = user.moviesList.find((id) => id === movieId);
    if (isMovieAlreadyAdded) throw new AppError("Movie already added", 400);
  }

  private showAlreadyAdded(showId: number, user: UserDTO): void {
    const isShowAlreadyAdded = user.showsList.find((id) => id === showId);
    if (isShowAlreadyAdded) throw new AppError("Show already added", 400);
  }

  async changeAvatar(avatar: string, userId: string) {
    await this.userRepository.changeAvatar(avatar, userId);

    return { message: "Avatar changed successfully!" };
  }

  async addMovie(movieId: number, userId: string) {
    const user = await this.getUserById(userId);
    this.movieAlreadyAdded(movieId, user);
    await this.userRepository.addMovie(movieId, userId);

    return { message: "Movie added successfully!" };
  }

  async addShow(showId: number, userId: string) {
    const user = await this.getUserById(userId);
    this.showAlreadyAdded(showId, user);
    await this.userRepository.addShow(showId, userId);

    return { message: "Show added successfully!" };
  }

  async removeMovie(movieId: number, userId: string) {
    await this.userRepository.removeMovie(movieId, userId);

    return { message: "Movie deleted successfully!" };
  }

  async removeShow(showId: number, userId: string) {
    await this.userRepository.removeShow(showId, userId);

    return { message: "Show deleted successfully!" };
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<UserDTO> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.userRepository.createUser(
        username,
        hashedPassword,
        email
      );

      return user;
    } catch (err) {
      throw new AppError("CREDENTIALS_IN_USE", 400);
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUserName(username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new AppError("INVALID_PASSWORD", 400);

      const token = jwt.sign(
        { _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 },
        TOKEN_SECRET
      );
      return { jwt: token, user };
    } else {
      throw new AppError("NO_SUCH_USER", 400);
    }
  }
}
