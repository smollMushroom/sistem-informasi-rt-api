"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLetterRequestSchema = void 0;
const zod_1 = require("zod");
exports.createLetterRequestSchema = zod_1.z.object({
    letterType: zod_1.z.string().min(1, 'Jenis surat harus diisi'),
    reason: zod_1.z.string().min(5, 'Alasan minimal 5 karakter'),
});
