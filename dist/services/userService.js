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
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUsersService = void 0;
const roles_1 = require("../config/roles");
const userRepository_1 = require("../repositories/userRepository");
const encryption_1 = require("../utils/encryption");
const error_1 = require("../utils/error");
const hash_1 = require("../utils/hash");
const userMapper_1 = require("../utils/userMapper");
const getUsersService = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 5, withPosts, withProfile } = option;
    const { users, totalUsers } = yield (0, userRepository_1.findAllUsers)(option);
    const message = users.length !== 0 ? 'Berhasil mendapatkan users' : 'Gagal mendapatkan users';
    const status = users.length !== 0 ? 'success' : 'fail';
    const pagination = {
        totalItems: totalUsers,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(totalUsers / limit)
    };
    return (0, userMapper_1.mapUserToDTO)({ message, status, pagination, users, option: { withPosts, withProfile } });
});
exports.getUsersService = getUsersService;
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!roles_1.roles.warga.includes(data.role)) {
        throw new error_1.ValidationError('Role tidak valid');
    }
    const encryptedData = {
        passwordHash: yield (0, hash_1.hashPassword)(data.password),
        nationalId: (0, encryption_1.encrypt)(data.profile.nationalId.toString()),
        phoneNumber: (0, encryption_1.encrypt)(data.profile.phoneNumber.toString()),
        nationalIdHash: (0, hash_1.hashString)(data.profile.nationalId),
        phoneNumberHash: (0, hash_1.hashString)(data.profile.phoneNumber),
    };
    const user = yield (0, userRepository_1.createUser)(data, encryptedData);
    const message = user !== null ? 'Berhasil membuat user' : 'Gagal membuat user';
    const pagination = {
        totalItems: 1,
        currentPage: 1,
        pageSize: 1,
        totalPages: 1
    };
    const status = user !== null ? 'success' : 'fail';
    const users = [user];
    return (0, userMapper_1.mapUserToDTO)({ message, pagination, status, users });
});
exports.createUserService = createUserService;
const updateUserService = (id, data, option) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { withPosts, withProfile } = option;
    const encryptedData = {
        nationalId: ((_a = data.profile) === null || _a === void 0 ? void 0 : _a.nationalId) ? (0, encryption_1.encrypt)(data.profile.nationalId.toString()) : undefined,
        phoneNumber: ((_b = data.profile) === null || _b === void 0 ? void 0 : _b.phoneNumber) ? (0, encryption_1.encrypt)(data.profile.phoneNumber.toString()) : undefined,
        nationalIdHash: ((_c = data.profile) === null || _c === void 0 ? void 0 : _c.nationalId) ? (0, hash_1.hashString)(data.profile.nationalId) : undefined,
        phoneNumberHash: ((_d = data.profile) === null || _d === void 0 ? void 0 : _d.phoneNumber) ? (0, hash_1.hashString)(data.profile.phoneNumber) : undefined,
    };
    const user = yield (0, userRepository_1.updateUser)(id, data, encryptedData);
    const message = 'Berhasil mengupdate user';
    const pagination = {
        totalItems: 1,
        currentPage: 1,
        pageSize: 1,
        totalPages: 1
    };
    const status = 'success';
    const users = [user];
    return (0, userMapper_1.mapUserToDTO)({ message, pagination, status, users, option: { withProfile, withPosts } });
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.deleteUser)(id);
    const message = 'Berhasil menghapus user';
    const pagination = {
        totalItems: 1,
        currentPage: 1,
        pageSize: 1,
        totalPages: 1
    };
    const status = 'success';
    const users = [user];
    return (0, userMapper_1.mapUserToDTO)({ message, pagination, status, users });
});
exports.deleteUserService = deleteUserService;
