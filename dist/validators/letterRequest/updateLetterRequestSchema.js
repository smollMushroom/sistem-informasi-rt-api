"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLetterRequestSchema = void 0;
const zod_1 = require("zod");
const requestStatusEnum = zod_1.z.enum(['pending', 'approved', 'rejected', 'process', 'canceled']);
exports.updateLetterRequestSchema = zod_1.z.object({
    letterType: zod_1.z.string().min(1).optional(),
    reason: zod_1.z.string().min(5).optional(),
    signed: zod_1.z.string().optional(),
    status: requestStatusEnum.optional(),
    processedDate: zod_1.z.coerce.date().optional(),
    pickupDate: zod_1.z.coerce.date().optional(),
});
