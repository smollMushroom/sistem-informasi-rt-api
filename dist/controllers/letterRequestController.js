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
exports.deleteLetterRequestController = exports.updateLetterRequestController = exports.createLetterRequestController = exports.getLetterRequestByIdController = exports.getAllLetterRequestsController = void 0;
const letterRequestService_1 = require("../services/letterRequestService");
const getAllLetterRequestsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            skip: req.query.skip ? parseInt(req.query.skip) : undefined,
            sortBy: req.query.sortBy,
            order: req.query.order,
            search: req.query.search,
        };
        if (user.role === "warga") {
            options.search = user.userId;
        }
        const result = yield (0, letterRequestService_1.getAllLetterRequestService)(options);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllLetterRequestsController = getAllLetterRequestsController;
const getLetterRequestByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, letterRequestService_1.getLetterRequestByIdService)(id);
        res.status(200).json(result);
    }
    catch (error) {
        next();
    }
});
exports.getLetterRequestByIdController = getLetterRequestByIdController;
const createLetterRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const input = Object.assign(Object.assign({}, req.body), { userId });
        const result = yield (0, letterRequestService_1.createLetterRequestService)(input);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createLetterRequestController = createLetterRequestController;
const updateLetterRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role, userId } = req.user;
        const body = req.body;
        const result = yield (0, letterRequestService_1.updateLetterRequestService)(Object.assign({ id, role, userId }, body));
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateLetterRequestController = updateLetterRequestController;
const deleteLetterRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, letterRequestService_1.deleteLetterRequestService)(id);
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLetterRequestController = deleteLetterRequestController;
