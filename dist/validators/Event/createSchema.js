"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul acara harus diisi"),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    startTime: zod_1.z.coerce.date({
        required_error: "Waktu mulai harus diisi",
        invalid_type_error: "Format waktu mulai tidak valid",
    }),
    endTime: zod_1.z.coerce.date().nullable().optional(),
});
exports.default = exports.createEventSchema;
