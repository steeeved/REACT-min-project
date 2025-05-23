import z from "zod";

export const ordersSchema = z.object({
  timeStamp: z.number(),
  item: z.string(),
  price: z.number(),
  customerId: z.number(),
  quantity: z.number()
});
