"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send({ message: 'Access denied' });
    try {
        const userCredentials = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'mecmec');
        req.body.userCredentials = userCredentials;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token');
    }
};
exports.default = auth;
