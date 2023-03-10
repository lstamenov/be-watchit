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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const app = (0, express_1.default)();
dotenv_1.default.config();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, config_1.connectDB)();
        app.use((0, cors_1.default)({ origin: "*" }));
        app.use(express_1.default.json());
        app.use(auth_1.default);
        app.use(profile_1.default);
        app.listen(process.env.PORT || 3001, () => console.log("Server started"));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
start();
