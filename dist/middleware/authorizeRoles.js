"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const error_1 = require("../utils/error");
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return next(new error_1.ForbiddenError('Akses ditolak'));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
