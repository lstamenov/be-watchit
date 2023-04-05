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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../errors/AppError"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findById(id);
        });
    }
    authUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(id);
            const token = jsonwebtoken_1.default.sign({ _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 }, config_1.TOKEN_SECRET);
            return { jwt: token, user };
        });
    }
    movieAlreadyAdded(movieId, user) {
        const isMovieAlreadyAdded = user.moviesList.find((id) => id === movieId);
        if (isMovieAlreadyAdded)
            throw new AppError_1.default("Movie already added", 400);
    }
    showAlreadyAdded(showId, user) {
        const isShowAlreadyAdded = user.showsList.find((id) => id === showId);
        if (isShowAlreadyAdded)
            throw new AppError_1.default("Show already added", 400);
    }
    changeAvatar(avatar, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.changeAvatar(avatar, userId);
            return { message: "Avatar changed successfully!" };
        });
    }
    addMovie(movieId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            this.movieAlreadyAdded(movieId, user);
            yield this.userRepository.addMovie(movieId, userId);
            return { message: "Movie added successfully!" };
        });
    }
    addShow(showId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            this.showAlreadyAdded(showId, user);
            yield this.userRepository.addShow(showId, userId);
            return { message: "Show added successfully!" };
        });
    }
    removeMovie(movieId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.removeMovie(movieId, userId);
            return { message: "Movie deleted successfully!" };
        });
    }
    removeShow(showId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.removeShow(showId, userId);
            return { message: "Show deleted successfully!" };
        });
    }
    register(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const user = yield this.userRepository.createUser(username, hashedPassword, email);
                return user;
            }
            catch (err) {
                throw new AppError_1.default("CREDENTIALS_IN_USE", 400);
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUserName(username);
            if (user) {
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid)
                    throw new AppError_1.default("INVALID_PASSWORD", 400);
                const token = jsonwebtoken_1.default.sign({ _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 }, config_1.TOKEN_SECRET);
                return { jwt: token, user };
            }
            else {
                throw new AppError_1.default("NO_SUCH_USER", 400);
            }
        });
    }
}
exports.default = UserService;
