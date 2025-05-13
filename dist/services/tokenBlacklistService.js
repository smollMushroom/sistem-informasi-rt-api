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
exports.cleanupExpiredTokens = exports.isTokenBlacklisted = exports.addTokenToBlacklist = void 0;
const tokenBlacklistRepository_1 = require("../repositories/tokenBlacklistRepository");
const addTokenToBlacklist = (token, expiresAt) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tokenBlacklistRepository_1.createBlacklistToken)(token, expiresAt);
});
exports.addTokenToBlacklist = addTokenToBlacklist;
const isTokenBlacklisted = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenInDb = yield (0, tokenBlacklistRepository_1.findBlacklistedToken)(token || '');
    return !!tokenInDb;
});
exports.isTokenBlacklisted = isTokenBlacklisted;
const cleanupExpiredTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tokenBlacklistRepository_1.deleteBlacklistedToken)();
    console.log(`[CRON] Deleted ${result.count} expired tokens`);
});
exports.cleanupExpiredTokens = cleanupExpiredTokens;
