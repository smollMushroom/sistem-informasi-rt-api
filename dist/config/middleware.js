"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const corsConfig = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
const urlencodedConfig = {
    extended: true,
    limit: '20mb'
};
const setupMiddleware = (app) => {
    app.use(express_1.default.json({ limit: '20mb' }));
    app.use((0, cors_1.default)(corsConfig));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.urlencoded(urlencodedConfig));
};
exports.setupMiddleware = setupMiddleware;
