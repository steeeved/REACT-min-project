import z from "zod";

export const itemSchema = z.object({
  index: z.number(),
  name: z.string(),
  price: z.number(),
});
