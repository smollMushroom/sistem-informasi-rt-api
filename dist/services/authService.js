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
exports.logoutUserService = exports.loginUserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const error_1 = require("../utils/error");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const tokenBlacklistService_1 = require("./tokenBlacklistService");
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.findUser)(email);
    if (!user)
        throw new error_1.NotFoundError('User tidak ditemukan');
    const isMatch = yield (0, hash_1.comparePassword)(password, user.passwordHash);
    if (!isMatch)
        throw new error_1.UnauthorizedError('Password salah');
    const token = (0, jwt_1.generateToken)({
        email: user.email,
        userId: user.id,
        role: user.role,
    });
    (0, userRepository_1.updateUser)(user.id, { token }, {});
    return token;
});
exports.loginUserService = loginUserService;
const logoutUserService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded || !decoded.exp)
        throw new error_1.UnauthorizedError("Token Tidak Valid");
    const expiresAt = new Date(decoded.exp * 1000);
    yield (0, tokenBlacklistService_1.addTokenToBlacklist)(token, expiresAt);
});
exports.logoutUserService = logoutUserService;
