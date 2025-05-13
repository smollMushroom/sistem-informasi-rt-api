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
exports.deleteBlacklistedToken = exports.findBlacklistedToken = exports.createBlacklistToken = void 0;
const database_1 = require("../config/database");
const createBlacklistToken = (token, expiresAt) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.blacklistedToken.create({
        data: { token, expiresAt }
    });
});
exports.createBlacklistToken = createBlacklistToken;
const findBlacklistedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.blacklistedToken.findUnique({
        where: { token }
    });
});
exports.findBlacklistedToken = findBlacklistedToken;
const deleteBlacklistedToken = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.blacklistedToken.deleteMany({
        where: {
            expiresAt: { lt: new Date() },
        },
    });
});
exports.deleteBlacklistedToken = deleteBlacklistedToken;
