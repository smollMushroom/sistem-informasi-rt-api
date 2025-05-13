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
exports.whoAmI = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmailOrUsername = exports.getUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const error_1 = require("../utils/error");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { withPosts, withProfile, limit, page } = req.query;
    const option = Object.assign(Object.assign({}, req.query), { limit: Number(limit) || 5, page: Number(page) || 1, withPosts: withPosts === "true", withProfile: withProfile === "true" });
    try {
        const users = yield (0, userService_1.getUsersService)(option);
        if (users.status === 'fail') {
            res.status(404).json(users);
            return;
        }
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserByEmailOrUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, withPosts, withProfile } = req.query;
    const option = Object.assign(Object.assign({}, req.query), { search: search, withPosts: withPosts === "true", withProfile: withProfile === "true" });
    if (!search) {
        return next(new error_1.NotFoundError("parameter search diperlukan"));
    }
    try {
        const user = yield (0, userService_1.getUsersService)(option);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmailOrUsername = getUserByEmailOrUsername;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requester = req.user;
        const isFromPublic = !requester;
        const bodyRole = req.body.role;
        if (isFromPublic) {
            req.body.role = 'warga';
        }
        else {
            if (requester.role !== 'ketua' && (bodyRole === 'admin' || bodyRole === 'ketua')) {
                return next(new error_1.ForbiddenError('Hanya untuk ketua yang bisa membuat admin atau ketua'));
            }
        }
        const newUser = yield (0, userService_1.createUserService)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const withProfile = req.query.withProfile;
    const user = req.user;
    const option = { withProfile: withProfile === 'true' };
    try {
        if (user.role === 'warga' && user.id !== id) {
            res.status(403).json({ message: 'Warga hanya dapat mengubah data miliknya sendiri' });
            return;
        }
        const updatedUser = yield (0, userService_1.updateUserService)(id, data, option);
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return next(new error_1.NotFoundError('parameter email diperlukan'));
        const deletedUser = yield (0, userService_1.deleteUserService)(id);
        res.json(deletedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const whoAmI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = jsonwebtoken_1.default.decode(req.token);
        const user = yield (0, userService_1.getUsersService)({ limit: 1, withProfile: true, search: userId });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.whoAmI = whoAmI;
