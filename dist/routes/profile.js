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
const verifyToken_1 = __importDefault(require("../validators/verifyToken"));
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
router.get('/user', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        res.send(user);
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
router.put('/avatar', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        user.avatarURL = req.body.avatar;
        yield user.save();
        res.status(200).send({ message: 'Avatar changed successfully!' });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
router.post('/movies', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        const movieId = req.body.id;
        (0, utils_1.checkIfMovieIsAlreadyAdded)('movie', movieId, user);
        user.moviesList.push(movieId);
        user.save();
        res.status(200).send({ message: 'Movie added successfully!' });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
router.post('/shows', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        const showId = req.body.id;
        (0, utils_1.checkIfMovieIsAlreadyAdded)('show', showId, user);
        user.showsList.push(showId);
        user.save();
        res.status(200).send({ message: 'Show added successfully!' });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
router.delete('/movies', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        user.moviesList = user.moviesList.filter((movieId) => movieId !== req.body.id);
        user.save();
        res.status(200).send({ message: 'Movie deleted successfully!' });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
router.delete('/shows', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserFromRequest)(req.body.userCredentials._id);
        user.showsList = user.showsList.filter((showId) => showId !== req.body.id);
        user.save();
        res.status(200).send({ message: 'Show deleted successfully!' });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
}));
exports.default = router;
