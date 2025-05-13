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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class LetterRequestRepository {
    static getAllLetterRequest(option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, skip, sortBy = 'createdAt', order = 'desc', search, } = option;
            const offset = typeof skip === 'number' ? skip : (page - 1) * limit;
            const validSortFields = {
                id: true,
                letterType: true,
                status: true,
                submissionDate: true,
                processedDate: true,
                pickupDate: true,
                createdAt: true,
                updatedAt: true,
            };
            const safeSortBy = validSortFields[sortBy] ? sortBy : 'createdAt';
            const statusValues = ['pending', 'approved', 'rejected'];
            const whereClause = search
                ? {
                    OR: [
                        {
                            id: {
                                equals: search,
                            },
                        },
                        {
                            letterType: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                        ...(statusValues.includes(search.toLowerCase())
                            ? [
                                {
                                    status: {
                                        equals: search.toLowerCase(),
                                    },
                                },
                            ]
                            : []),
                        {
                            user: {
                                is: {
                                    username: {
                                        contains: search,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                        {
                            user: {
                                is: {
                                    id: {
                                        contains: search,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                        {
                            user: {
                                is: {
                                    profile: {
                                        is: {
                                            fullName: {
                                                contains: search,
                                                mode: 'insensitive',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                }
                : {};
            const [total, data] = yield Promise.all([
                database_1.prisma.letterRequest.count({ where: whereClause }),
                database_1.prisma.letterRequest.findMany({
                    where: whereClause,
                    skip: offset,
                    take: limit,
                    orderBy: {
                        [safeSortBy]: order,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                role: true,
                                email: true,
                                username: true,
                                profile: {
                                    select: {
                                        id: true,
                                        fullName: true,
                                        address: true,
                                        birthDate: true,
                                        birthPlace: true,
                                        phoneNumber: true,
                                        nationalId: true,
                                        gender: true,
                                        nationality: true,
                                        religion: true,
                                        meritalStatus: true,
                                        occupation: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        userId: true,
                                    },
                                },
                            },
                        },
                    },
                }),
            ]);
            return {
                data,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        });
    }
    static getLetterRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const letter = yield database_1.prisma.letterRequest.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            role: true,
                            email: true,
                            username: true,
                            profile: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    address: true,
                                    birthDate: true,
                                    birthPlace: true,
                                    phoneNumber: true,
                                    nationalId: true,
                                    gender: true,
                                    nationality: true,
                                    religion: true,
                                    meritalStatus: true,
                                    occupation: true,
                                    createdAt: true,
                                    updatedAt: true,
                                    userId: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!letter) {
                throw new Error('Letter request not found');
            }
            return letter;
        });
    }
    static createLetterRequest(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, letterType, reason, letterNumber } = input;
            const userExists = yield database_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error('User not found');
            }
            const letterRequest = yield database_1.prisma.letterRequest.create({
                data: {
                    userId,
                    letterType,
                    reason,
                    letterNumber
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            role: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
            return letterRequest;
        });
    }
    static updateLetterRequest(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, role } = input, updateData = __rest(input, ["id", "role"]);
            const existingRequest = yield database_1.prisma.letterRequest.findUnique({
                where: { id },
            });
            if (!existingRequest) {
                throw new Error('LetterRequest not found');
            }
            const updated = yield database_1.prisma.letterRequest.update({
                where: { id },
                data: Object.assign(Object.assign({}, updateData), { updatedAt: new Date() }),
                include: {
                    user: true,
                },
            });
            return updated;
        });
    }
    static deleteLetterRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield database_1.prisma.letterRequest.findUnique({
                where: { id },
            });
            if (!existing) {
                throw new Error('LetterRequest not found');
            }
            yield database_1.prisma.letterRequest.delete({
                where: { id },
            });
            return { message: 'LetterRequest deleted successfully' };
        });
    }
}
_a = LetterRequestRepository;
LetterRequestRepository.findLastLetterNumber = (romanMonth, year) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.prisma.letterRequest.findFirst({
        where: {
            letterNumber: {
                endsWith: `${romanMonth}-${year}`
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            letterNumber: true
        }
    });
    return result ? result.letterNumber : null;
});
exports.default = LetterRequestRepository;
