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
exports.deleteEventScheduleController = exports.updateEventScheduleController = exports.createEventScheduleController = exports.getEventScheduleByIdController = exports.getAllEventScheduleController = void 0;
const eventService_1 = require("../services/eventService");
const getAllEventScheduleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            skip: req.query.skip ? parseInt(req.query.skip) : undefined,
            sortBy: req.query.sortBy,
            order: req.query.order,
            search: req.query.search,
        };
        const result = yield (0, eventService_1.getAllEventScheduleService)(options);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEventScheduleController = getAllEventScheduleController;
const getEventScheduleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, eventService_1.getEventScheduleByIdService)(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventScheduleByIdController = getEventScheduleByIdController;
const createEventScheduleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const input = req.body;
        const result = yield (0, eventService_1.createEventScheduleService)(Object.assign(Object.assign({}, input), { createdById: userId }));
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createEventScheduleController = createEventScheduleController;
const updateEventScheduleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const input = req.body;
        const result = yield (0, eventService_1.updateEventScheduleService)(id, input);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateEventScheduleController = updateEventScheduleController;
const deleteEventScheduleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, eventService_1.deleteEventScheduleService)(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEventScheduleController = deleteEventScheduleController;
