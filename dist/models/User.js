"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarURL: {
        type: String,
    },
    moviesList: {
        type: [],
        required: true,
    },
    showsList: {
        type: [],
        required: true,
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
User.createIndexes();
exports.default = User;
