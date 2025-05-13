import { z } from "zod";

export const updatePostSchema = z.object({
  title: z.string().min(3),
  thumbnail: z.string().optional(),
  content: z.string(),
  type: z.enum(['announcement', 'news'])
})