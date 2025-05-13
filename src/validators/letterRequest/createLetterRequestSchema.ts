import { z } from "zod";

export const createLetterRequestSchema = z.object({
  letterType: z.string().min(1, 'Jenis surat harus diisi'),
  reason: z.string().min(5, 'Alasan minimal 5 karakter'),
});