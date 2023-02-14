"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DB_CONNECT || '3000', () => console.log('connected'));
app.use(express_1.default.json());
app.use(auth_1.default);
app.use(profile_1.default);
app.listen(3001, () => console.log('running'));
