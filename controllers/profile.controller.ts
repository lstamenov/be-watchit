import checkIfMovieIsAlreadyAdded from "../utils/checkIfMovieIsAlreadyAdded";
import getUserFromRequest from "../utils/getUserFromRequest";

const getUserData = async (params: { id: string }) => {
  const { id } = params;
  const user = await getUserFromRequest(id);
  return user;
};

const changeUserAvatar = async (params: { avatar: string; id: string }) => {
  const { id, avatar } = params;
  const user = await getUserFromRequest(id);
  user.avatarURL = avatar;
  await user.save();

  return { message: "Avatar changed successfully!" };
};

const addMovieToList = async (params: { movieId: number; userId: string }) => {
  const { movieId, userId } = params;

  const user = await getUserFromRequest(userId);
  checkIfMovieIsAlreadyAdded("movie", movieId, user);
  user.moviesList.push(movieId);
  user.save();
  return { message: "Movie added successfully!" };
};

const addShowToList = async (params: { showId: number; userId: string }) => {
  const { showId, userId } = params;

  const user = await getUserFromRequest(userId);
  checkIfMovieIsAlreadyAdded("show", showId, user);
  user.showsList.push(showId);
  user.save();

  return { message: "Show added successfully!" };
};

const removeMovieFromList = async (params: {
  movieId: number;
  userId: string;
}) => {
  const { movieId, userId } = params;

  const user = await getUserFromRequest(userId);
  user.moviesList = user.moviesList.filter((id) => id !== movieId);
  user.save();
  return { message: "Movie deleted successfully!" };
};

const removeShowFromList = async (params: {
  showId: number;
  userId: string;
}) => {
  const { showId, userId } = params;

  const user = await getUserFromRequest(userId);
  user.showsList = user.showsList.filter((id) => id !== showId);
  user.save();

  return { message: "Show deleted successfully!" };
};

export {
  getUserData,
  changeUserAvatar,
  addMovieToList,
  addShowToList,
  removeMovieFromList,
  removeShowFromList,
};