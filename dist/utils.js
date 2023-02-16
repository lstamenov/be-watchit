"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfMovieIsAlreadyAdded = exports.getUserFromRequest = void 0;
const User_1 = __importDefault(require("./models/User"));
const getUserFromRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(id);
    if (user) {
        return user;
    }
    else {
        throw new Error('Invalid token');
    }
});
exports.getUserFromRequest = getUserFromRequest;
const checkIfMovieIsAlreadyAdded = (type, movieId, user) => {
    let result = null;
    if (type === 'show') {
        result = user.showsList.find((id) => id === movieId);
    }
    if (type === 'movie') {
        result = user.moviesList.find((id) => id === movieId);
    }
    if (result) {
        throw new Error();
    }
};
exports.checkIfMovieIsAlreadyAdded = checkIfMovieIsAlreadyAdded;
