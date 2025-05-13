"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, jwtConfig_1.jwtConfig.secret, { expiresIn: jwtConfig_1.jwtConfig.expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, jwtConfig_1.jwtConfig.secret);
};
exports.verifyToken = verifyToken;
