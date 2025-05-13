"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(['warga', 'admin', 'ketua']),
    profile: zod_1.z.object({
        fullName: zod_1.z.string().min(1, 'Nama lengkap wajib diisi'),
        address: zod_1.z.string().min(1, 'Alamat wajib diisi'),
        birthDate: zod_1.z.string(),
        birthPlace: zod_1.z.string(),
        phoneNumber: zod_1.z.string(),
        nationalId: zod_1.z.string(),
        meritalStatus: zod_1.z.enum(['sudah menikah', 'belum menikah'], {
            errorMap: () => ({ message: 'Harus pilih status pernikahan yang valid' }),
        }),
        occupation: zod_1.z.string().min(1, 'Pekerjaan wajib diisi'),
        gender: zod_1.z.enum(['male', 'female']),
        nationality: zod_1.z.string().min(1, 'Kewarganegaraan wajib diisi'),
        religion: zod_1.z.enum(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
    }),
});
