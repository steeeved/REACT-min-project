import z from "zod";
import { ordersSchema } from "./orders";

export const customerSchema = z.object({
  id: z.number(),
  title: z.string(),
  firstName: z.string().max(4),
  lastName: z.string(),
  orders: z.array(ordersSchema),
});
