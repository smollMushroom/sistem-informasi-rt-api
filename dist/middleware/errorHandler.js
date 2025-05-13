"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../utils/error");
const errorHandler = (err, req, res, next) => {
    var _a, _b;
    console.error(err.stack);
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            const fields = ((_b = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.join(', ')) || 'field unik';
            err = new error_1.ConflictError(`${fields} sudah digunakan.`);
        }
    }
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Terjadi kesalahan pada server',
    });
};
exports.errorHandler = errorHandler;
