"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_CONNECT_STRING = exports.TOKEN_SECRET = void 0;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "mecmec";
exports.TOKEN_SECRET = TOKEN_SECRET;
const DB_CONNECT_STRING = process.env.DB_CONNECT || "";
exports.DB_CONNECT_STRING = DB_CONNECT_STRING;
const PORT = process.env.PORT || 3001;
exports.PORT = PORT;
