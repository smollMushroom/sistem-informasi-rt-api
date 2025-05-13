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
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUser = exports.findAllUsers = void 0;
const database_1 = require("../config/database");
const findAllUsers = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, role, withPosts, withProfile, limit = 5, page = 1, skip, sortBy = 'createdAt', order = 'desc', } = option || {};
    const whereClause = {};
    if (role) {
        whereClause.role = role;
    }
    if (search) {
        whereClause.OR = [{ id: search }, { email: search }, { username: search }];
    }
    const parsedLimit = Number(limit) || 5;
    const parsedPage = Number(page) || 1;
    const paginationSkip = skip != undefined ? skip : (parsedPage - 1) * parsedLimit;
    const [users, totalUsers] = yield Promise.all([
        database_1.prisma.user.findMany({
            where: whereClause,
            include: {
                profile: withProfile,
                posts: withPosts,
            },
            skip: paginationSkip,
            take: parsedLimit,
            orderBy: {
                [sortBy]: order,
            },
        }),
        database_1.prisma.user.count({
            where: whereClause,
        }),
    ]);
    return { users, totalUsers };
});
exports.findAllUsers = findAllUsers;
const findUser = (search, option) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.user.findFirst({
        where: {
            OR: [{ id: search }, { email: search }, { username: search }],
        },
        include: {
            profile: option === null || option === void 0 ? void 0 : option.withProfile,
            posts: option === null || option === void 0 ? void 0 : option.withPosts,
        },
    });
});
exports.findUser = findUser;
const createUser = (data, encryptedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role, token, username, profile } = data;
    const { address, birthDate, fullName, meritalStatus, occupation, birthPlace, gender, nationality, religion, } = profile;
    const { nationalId, nationalIdHash, passwordHash, phoneNumber, phoneNumberHash, } = encryptedData;
    return yield database_1.prisma.user.create({
        data: {
            email,
            username,
            role,
            token,
            passwordHash,
            profile: {
                create: {
                    gender,
                    nationality,
                    religion,
                    fullName,
                    address,
                    birthDate,
                    birthPlace,
                    phoneNumber,
                    nationalId,
                    phoneNumberHash,
                    nationalIdHash,
                    meritalStatus,
                    occupation,
                },
            },
        },
        include: { profile: true },
    });
});
exports.createUser = createUser;
const updateUser = (id, data, encryptedData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const user = yield database_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    return yield database_1.prisma.user.update({
        where: { id },
        data: {
            username: data.username,
            email: data.email,
            role: data.role,
            token: data.token,
            // passwordHash: data.passwordHash,
            profile: {
                update: {
                    fullName: (_a = data.profile) === null || _a === void 0 ? void 0 : _a.fullName,
                    address: (_b = data.profile) === null || _b === void 0 ? void 0 : _b.address,
                    birthDate: (_c = data.profile) === null || _c === void 0 ? void 0 : _c.birthDate,
                    birthPlace: (_d = data.profile) === null || _d === void 0 ? void 0 : _d.birthPlace,
                    gender: (_e = data.profile) === null || _e === void 0 ? void 0 : _e.gender,
                    religion: (_f = data.profile) === null || _f === void 0 ? void 0 : _f.religion,
                    nationality: (_g = data.profile) === null || _g === void 0 ? void 0 : _g.nationality,
                    meritalStatus: (_h = data.profile) === null || _h === void 0 ? void 0 : _h.meritalStatus,
                    occupation: (_j = data.profile) === null || _j === void 0 ? void 0 : _j.occupation,
                    phoneNumber: encryptedData.phoneNumber,
                    phoneNumberHash: encryptedData.phoneNumberHash,
                    nationalId: encryptedData.nationalId,
                    nationalIdHash: encryptedData.nationalIdHash,
                    sign: (_k = data.profile) === null || _k === void 0 ? void 0 : _k.sign
                },
            },
        },
        include: { profile: true },
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    return yield database_1.prisma.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
