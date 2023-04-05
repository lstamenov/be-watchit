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
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const errorHandler_1 = __importDefault(require("./miiddlewares/errorHandler"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const app = (0, express_1.default)();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.DB_CONNECT_STRING);
        app.use((0, cors_1.default)({ origin: "*" }));
        app.use(express_1.default.json());
        app.use(user_controller_1.default);
        app.use(errorHandler_1.default);
        app.listen(config_1.PORT, () => console.log('Server started on port: ' + config_1.PORT));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
start();
