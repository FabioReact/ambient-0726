import z from "zod";

export const schema = z.object({
  hero: z.string().min(2).max(25),
});
