import { z } from "zod";

export const updateEventSchema = z.object({
  title: z.string().min(1, "Judul acara tidak boleh kosong").optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().nullable().optional(),
});

export default updateEventSchema