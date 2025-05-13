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
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const error_1 = require("../utils/error");
const tokenBlacklistService_1 = require("../services/tokenBlacklistService");
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next(new error_1.UnauthorizedError('Token tidak ditemukan'));
    const token = authHeader.split(' ')[1];
    const isBlackListed = yield (0, tokenBlacklistService_1.isTokenBlacklisted)(token);
    if (isBlackListed) {
        return next(new error_1.UnauthorizedError("Token sudah tidak berlaku"));
    }
    try {
        const decode = (0, jwt_1.verifyToken)(token);
        req.user = decode;
        req.token = token;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new error_1.UnauthorizedError('Token telah kedaluwarsa'));
        }
        return next(new error_1.UnauthorizedError('Token tidak valid'));
    }
});
exports.authenticateJWT = authenticateJWT;
