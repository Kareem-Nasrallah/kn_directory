import z from "zod";

export const newStartupSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  category: z.string().min(3).max(20),
  image: z.string().url().or(z.string().startsWith("data:image")), // يقبل URL أو Base64
  pitch: z.string().min(10),
});
