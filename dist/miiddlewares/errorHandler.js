"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError_1.default) {
        res.status(err.statusCode).send({ error: err.message });
    }
    else {
        res.status(500).send({ error: "Internal service error" });
    }
};
exports.default = errorHandler;
