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
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id);
            if (user === null)
                throw new Error("Invalid user ID");
            return user;
        });
    }
    findByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ username });
        });
    }
    changeAvatar(avatar, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.avatarURL = avatar;
            user.save();
        });
    }
    addMovie(movieId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.moviesList.push(movieId);
            user.save();
        });
    }
    addShow(showId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.showsList.push(showId);
            user.save();
        });
    }
    removeMovie(movieId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.moviesList = user.moviesList.filter((id) => id !== movieId);
            user.save();
        });
    }
    removeShow(showId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.showsList = user.showsList.filter((id) => id !== showId);
            user.save();
        });
    }
    createUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.create({
                username,
                password,
                email,
                showsList: [],
                moviesList: [],
                avatarURL: "",
            });
            return user.save();
        });
    }
}
exports.default = UserRepository;
