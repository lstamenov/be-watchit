"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (type, movieId, user) => {
    let result = null;
    if (type === "show") {
        result = user.showsList.find((id) => id === movieId);
    }
    if (type === "movie") {
        result = user.moviesList.find((id) => id === movieId);
    }
    if (result) {
        throw new Error();
    }
};
