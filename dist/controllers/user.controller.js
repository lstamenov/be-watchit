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
const express_1 = require("express");
const UserService_1 = __importDefault(require("../services/UserService"));
const verifyToken_1 = __importDefault(require("../miiddlewares/verifyToken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
const repository = new UserRepository_1.default(User_1.default);
const service = new UserService_1.default(repository);
router.get("/user", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userCredentials: { _id }, } = req.body;
    const user = yield service.getUserById(_id);
    res.send(user);
}));
router.put("/avatar", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatar, userCredentials } = req.body;
    const result = yield service.changeAvatar(avatar, userCredentials._id);
    res.send(result);
}));
router.post("/movies", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userCredentials: { _id }, } = req.body;
    const result = yield service.addMovie(id, _id);
    res.send(result);
}));
router.post("/shows", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userCredentials: { _id }, } = req.body;
    const result = yield service.addShow(id, _id);
    res.send(result);
}));
router.delete("/movies", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userCredentials: { _id }, } = req.body;
    const result = yield service.removeMovie(id, _id);
    res.send(result);
}));
router.delete("/shows", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userCredentials: { _id }, } = req.body;
    const result = yield service.removeShow(id, _id);
    res.send(result);
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = yield service.register(username, password, email);
    res.send(user);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield service.login(username, password);
    res.send(user);
}));
exports.default = router;
