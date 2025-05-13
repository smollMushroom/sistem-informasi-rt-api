"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const gracefulShutdown_1 = require("./utils/gracefulShutdown");
const middleware_1 = require("./config/middleware");
const cleanupExpiredTokens_1 = require("./utils/cleanupExpiredTokens");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, middleware_1.setupMiddleware)(app);
(0, cleanupExpiredTokens_1.scheduleTokenCleanup)();
app.use('/v1', routes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[Server] berjalan di http://localhost:${port}`);
});
(0, gracefulShutdown_1.setupGracefulShutdown)();
