import User from "./models/User";
import { UserI } from "./types";

export const getUserFromRequest = async (id: string) => {
  const user = await User.findById(id);
  
  if (user) {
   return user
  } else {
    throw new Error('Invalid token');
  }
};

export const checkIfMovieIsAlreadyAdded = (type: 'show' | 'movie', movieId: number, user: UserI) => {
  let result = null;
  
  if (type === 'show') {
    result = user.showsList.find((id: number) => id === movieId);
  }

  if (type === 'movie') {
    result = user.moviesList.find((id: number) => id === movieId);
  }

  if (result) {
    throw new Error();
  }
};