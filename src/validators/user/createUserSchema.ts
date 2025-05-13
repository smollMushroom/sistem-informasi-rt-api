import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['warga', 'admin', 'ketua']),
  profile: z.object({
    fullName: z.string().min(1, 'Nama lengkap wajib diisi'),
    address: z.string().min(1, 'Alamat wajib diisi'),
    birthDate: z.string(),
    birthPlace: z.string(),
    phoneNumber: z.string(),
    nationalId: z.string(),
    meritalStatus: z.enum(['sudah menikah', 'belum menikah'], {
      errorMap: () => ({ message: 'Harus pilih status pernikahan yang valid' }),
    }),
    occupation: z.string().min(1, 'Pekerjaan wajib diisi'),
    gender: z.enum(['male', 'female']),
    nationality: z.string().min(1, 'Kewarganegaraan wajib diisi'),
    religion: z.enum(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
  }),
});