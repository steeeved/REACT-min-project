import z from "zod";
import { ordersSchema } from "./orders";

export const CustomerSchema = z.object({
  id: z.string(),
  title: z.string(),
  firstName: z.string().max(60, "First Name must be between 0-60 characters"),
  lastName: z.string().max(60, "Last Name must be between 0-60 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .max(150, "Email must be between 0-150 characters"),
  orders: z.array(ordersSchema).optional(),
});

export const customerRegistrationInputSchema = CustomerSchema.pick({
  title: true,
  firstName: true,
  lastName: true,
  email: true,
});

export type RegistrationData = Partial<
  z.infer<typeof customerRegistrationInputSchema>
>;

export type FieldErrors = Partial<Record<keyof RegistrationData, string[]>>;

export interface FormErrors extends FieldErrors {
  submit?: string[];
}
