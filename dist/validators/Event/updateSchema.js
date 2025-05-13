"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = void 0;
const zod_1 = require("zod");
exports.updateEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Judul acara tidak boleh kosong").optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    startTime: zod_1.z.coerce.date().optional(),
    endTime: zod_1.z.coerce.date().nullable().optional(),
});
exports.default = exports.updateEventSchema;
