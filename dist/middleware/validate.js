"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const error_1 = require("../utils/error");
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new error_1.ValidationError('Validasi data gagal'));
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
