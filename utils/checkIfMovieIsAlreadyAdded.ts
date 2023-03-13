import { UserI } from "../types";

export default (type: "show" | "movie", movieId: number, user: UserI) => {
  let result = null;

  if (type === "show") {
    result = user.showsList.find((id: number) => id === movieId);
  }

  if (type === "movie") {
    result = user.moviesList.find((id: number) => id === movieId);
  }

  if (result) {
    throw new Error();
  }
};
