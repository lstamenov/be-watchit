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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_controller_1.register)(req.body);
    if (result) {
        res.send(result);
    }
    res.status(400).send({ errorCode: 400, message: "Username or Email already in use" });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_controller_1.login)(req.body);
    res.status((result === null || result === void 0 ? void 0 : result.jwt) ? 200 : 400).send(result);
}));
exports.default = router;
