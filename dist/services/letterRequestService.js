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
exports.deleteLetterRequestService = exports.updateLetterRequestService = exports.createLetterRequestService = exports.getLetterRequestByIdService = exports.getAllLetterRequestService = void 0;
const LetterRequestRepository_1 = __importDefault(require("../repositories/LetterRequestRepository"));
const createLetterNumber_1 = __importDefault(require("../utils/createLetterNumber"));
const decryption_1 = require("../utils/decryption");
const error_1 = require("../utils/error");
const letterMapper_1 = __importDefault(require("../utils/letterMapper"));
const getAllLetterRequestService = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, pagination } = yield LetterRequestRepository_1.default.getAllLetterRequest(option);
    const processedLetterRequests = data.map((item) => (Object.assign(Object.assign({}, item), { user: Object.assign(Object.assign({}, item.user), { profile: item.user.profile
                ? Object.assign(Object.assign({}, item.user.profile), { nationalId: item.user.profile.nationalId
                        ? (0, decryption_1.safeDecrypt)(item.user.profile.nationalId)
                        : null, phoneNumber: item.user.profile.phoneNumber
                        ? (0, decryption_1.safeDecrypt)(item.user.profile.phoneNumber)
                        : null }) : null }) })));
    return (0, letterMapper_1.default)({
        letterRequests: processedLetterRequests,
        pagination: {
            totalItems: pagination.total,
            currentPage: pagination.page,
            totalPages: pagination.totalPages,
            pageSize: pagination.limit,
        },
        message: 'Berhasil mengambil data permohonan surat',
        status: 'success',
    });
});
exports.getAllLetterRequestService = getAllLetterRequestService;
const getLetterRequestByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const letterRequest = yield LetterRequestRepository_1.default.getLetterRequestById(id);
    const processedLetterRequests = Object.assign(Object.assign({}, letterRequest), { user: Object.assign(Object.assign({}, letterRequest.user), { profile: letterRequest.user.profile
                ? Object.assign(Object.assign({}, letterRequest.user.profile), { nationalId: letterRequest.user.profile.nationalId
                        ? (0, decryption_1.safeDecrypt)(letterRequest.user.profile.nationalId)
                        : null, phoneNumber: letterRequest.user.profile.phoneNumber
                        ? (0, decryption_1.safeDecrypt)(letterRequest.user.profile.phoneNumber)
                        : null }) : null }) });
    return {
        message: 'Berhasil mengambil detail permohonan surat',
        status: 'success',
        data: processedLetterRequests,
    };
});
exports.getLetterRequestByIdService = getLetterRequestByIdService;
const createLetterRequestService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const letterNumber = yield (0, createLetterNumber_1.default)();
    const letterRequest = yield LetterRequestRepository_1.default.createLetterRequest(Object.assign(Object.assign({}, input), { letterNumber }));
    return {
        message: 'Permohonan surat berhasil dibuat',
        status: 'success',
        data: letterRequest,
    };
});
exports.createLetterRequestService = createLetterRequestService;
const updateLetterRequestService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId, id } = input;
    if (role === 'warga') {
        const surat = yield LetterRequestRepository_1.default.getLetterRequestById(id);
        if (!surat || surat.userId !== userId) {
            throw new error_1.UnauthorizedError('Akses ditolak: Anda tidak memiliki surat ini.');
        }
    }
    const updatedLetter = yield LetterRequestRepository_1.default.updateLetterRequest(input);
    return {
        message: 'Surat berhasil diperbarui',
        status: 'success',
        data: updatedLetter,
    };
});
exports.updateLetterRequestService = updateLetterRequestService;
const deleteLetterRequestService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield LetterRequestRepository_1.default.deleteLetterRequest(id);
    return {
        message: 'Permohonan surat berhasil dihapus',
        status: 'success',
    };
});
exports.deleteLetterRequestService = deleteLetterRequestService;
