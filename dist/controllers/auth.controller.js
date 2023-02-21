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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = params;
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield User_1.default.create({
            username,
            password: hashedPassword,
            email,
            showsList: [],
            moviesList: [],
            avatarURL: "",
        });
        const savedUser = yield user.save();
        return savedUser;
    }
    catch (err) {
        return null;
    }
});
exports.register = register;
const login = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = params;
    const user = yield User_1.default.findOne({ username });
    if (user) {
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return { message: "Invalid password" };
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
        return { jwt: token, user };
    }
    else {
        return { message: 'There is no such user' };
    }
});
exports.login = login;
