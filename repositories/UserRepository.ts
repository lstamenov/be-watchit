import { UserDTO, UserModel } from "../models/types";

export default class UserRepository {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userModel.findById(id);
    if (user === null) throw new Error("Invalid user ID");
    return user;
  }

  async findByUserName(username: string): Promise<UserDTO | null> {
    return this.userModel.findOne({ username });
  }

  async changeAvatar(avatar: string, userId: string) {
    const user = await this.findById(userId);
    user.avatarURL = avatar;
    user.save();
  }

  async addMovie(movieId: number, userId: string) {
    const user = await this.findById(userId);
    user.moviesList.push(movieId);
    user.save();
  }

  async addShow(showId: number, userId: string) {
    const user = await this.findById(userId);
    user.showsList.push(showId);
    user.save();
  }

  async removeMovie(movieId: number, userId: string) {
    const user = await this.findById(userId);
    user.moviesList = user.moviesList.filter((id) => id !== movieId);
    user.save();
  }

  async removeShow(showId: number, userId: string) {
    const user = await this.findById(userId);
    user.showsList = user.showsList.filter((id) => id !== showId);
    user.save();
  }

  async createUser(username: string, password: string, email: string) {
      const user = await this.userModel.create({
        username,
        password,
        email,
        showsList: [],
        moviesList: [],
        avatarURL: "",
      });

      return user.save();
  }
}
