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
exports.deleteEventScheduleService = exports.updateEventScheduleService = exports.createEventScheduleService = exports.getEventScheduleByTitleService = exports.getEventScheduleByIdService = exports.getAllEventScheduleService = void 0;
const EventScheduleRepository_1 = __importDefault(require("../repositories/EventScheduleRepository"));
const eventMapper_1 = __importDefault(require("../utils/eventMapper"));
const getAllEventScheduleService = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, pagination } = yield EventScheduleRepository_1.default.getAllEvent(option);
    return (0, eventMapper_1.default)({
        events: data,
        pagination: {
            totalItems: pagination.total,
            currentPage: pagination.page,
            totalPages: pagination.totalPages,
            pageSize: pagination.limit,
        },
        message: "Berhasil mengambil semua data jadwal acara",
        status: "success",
    });
});
exports.getAllEventScheduleService = getAllEventScheduleService;
const getEventScheduleByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield EventScheduleRepository_1.default.getEventById(id);
    return {
        message: "Berhasil mengambil detail jadwal acara",
        status: "success",
        data: event,
    };
});
exports.getEventScheduleByIdService = getEventScheduleByIdService;
const getEventScheduleByTitleService = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield EventScheduleRepository_1.default.getEventByTitle(title);
    return {
        message: "Berhasil mengambil detail jadwal acara berdasarkan judul",
        status: "success",
        data: event,
    };
});
exports.getEventScheduleByTitleService = getEventScheduleByTitleService;
const createEventScheduleService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const newEvent = yield EventScheduleRepository_1.default.createEvent(input, input.createdById);
    return {
        message: "Jadwal acara berhasil dibuat",
        status: "success",
        data: newEvent,
    };
});
exports.createEventScheduleService = createEventScheduleService;
const updateEventScheduleService = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield EventScheduleRepository_1.default.updateEvent(id, input);
    return {
        message: "Jadwal acara berhasil diperbarui",
        status: "success",
        data: updated,
    };
});
exports.updateEventScheduleService = updateEventScheduleService;
const deleteEventScheduleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield EventScheduleRepository_1.default.deleteEvent(id);
    return {
        message: "Jadwal acara berhasil dihapus",
        status: "success",
    };
});
exports.deleteEventScheduleService = deleteEventScheduleService;
