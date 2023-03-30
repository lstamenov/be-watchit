"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        throw new AppError_1.default('Invalid access token', 403);
    try {
        const userCredentials = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
        req.body.userCredentials = userCredentials;
        next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid access token', 403);
    }
};
exports.default = auth;
