import { z } from "zod";

const requestStatusEnum = z.enum(['pending', 'approved', 'rejected', 'process', 'canceled']);

export const updateLetterRequestSchema = z.object({
  letterType: z.string().min(1).optional(),
  reason: z.string().min(5).optional(),
  signed: z.string().optional(),
  status: requestStatusEnum.optional(),
  processedDate: z.coerce.date().optional(),
  pickupDate: z.coerce.date().optional(),
});

