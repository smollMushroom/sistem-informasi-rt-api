import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Judul acara harus diisi"),
  description: z.string().optional(),
  location: z.string().optional(),
  startTime: z.coerce.date({
    required_error: "Waktu mulai harus diisi",
    invalid_type_error: "Format waktu mulai tidak valid",
  }),
  endTime: z.coerce.date().nullable().optional(),
});

export default createEventSchema;