"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    thumbnail: zod_1.z.string().optional(),
    content: zod_1.z.string(),
    type: zod_1.z.enum(['announcement', 'news'])
});
